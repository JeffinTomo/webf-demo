import { useState, useEffect, useCallback } from 'react';
import ReferralCode from '../referral-code';
import { userAPIs } from '../../api/api';
import type { RequestType, GetUserInfoResponse, GetInviteInfoResponse } from '../../api/types';
import { WebFPoint } from '@wlfi/webf-point';
import MyPoints from '../my-points';
import { logger, parseQueryString } from '../../utils/utils';


// const env = window.location.href.indexOf('?env=prod') > -1 ? "prod" : "dev";

export default function InviteFriends() {
  const appParams = parseQueryString() as { env: string, action: 'share' | 'referral' | '', code?: string };
  const [timer, setTimer] = useState({ days: 6, hours: 23, minutes: 36, seconds: 51 });
  const [showReferralCode, setShowReferralCode] = useState(!!appParams?.code);
  const [userInfo, setUserInfo] = useState<RequestType<GetUserInfoResponse["data"]> | null | any>(null);
  const [inviteInfo, setInviteInfo] = useState<RequestType<GetInviteInfoResponse["data"]> | null>(null);

  const [deviceId, setDeviceId] = useState<string>('');
  const [codeBinded, setCodeBinded] = useState(false);

  const regNewDevice = useCallback(async () => {
    logger('appParams', appParams);
    if (!WebFPoint.isAvailable()) {
      return;
    }
    try {
      const result = await WebFPoint.generateUniqueId();
      logger('generateUniqueId:', result);
      logger('generateUniqueId:', result?.id || '');
      if (!result?.id) {
        return;
      }
      const res = await userAPIs.regNewDevice({ deviceIdentity: result.id });
      logger('regNewDevice:', res);
      setDeviceId(result?.id);
    } catch (err) {
      console.error('Failed to generate unique id:', err);
    }
  }, []);

  const refreshUserData = useCallback(async () => {
    if (!deviceId) {
      return;
    }

    userAPIs.getUserInfo().then((res) => {
      logger('User info:', res);
      setUserInfo(res);
    });

    userAPIs.getInviteInfo().then((res) => {
      logger('Invite info:', res);
      setInviteInfo(res);
    });
  }, [deviceId]);


  // Set up method channel handlers - only run once on mount
  useEffect(() => {
    (async () => {
      await regNewDevice();
      await refreshUserData();
    })();
  }, [regNewDevice, refreshUserData]);

  // Refresh user data when uniqueId changes
  useEffect(() => {
    refreshUserData();
  }, [deviceId, codeBinded, refreshUserData]);


  useEffect(() => {
    logger('autoInvite start', { inviteInfo, action: appParams?.action });
    const code = inviteInfo?.data?.inviteCode || '';
    if (code && appParams?.action === 'share') {
      WebFPoint.shareInviteCode({ code }).then((res: any) => {
        logger('Share invite code result:', res);
      });
    }
  }, [inviteInfo, appParams?.action]);

  // Timer countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [isInviting, setIsInviting] = useState(false);
  const handleInvite = async (code: string) => {
    if (!code) {
      throw new Error('Code is required');
    }
    setIsInviting(true);
    const res = await WebFPoint.shareInviteCode({ code });
    logger('Share invite code result:', res);
    setIsInviting(false);
  };

  const handleEnterCode = () => {
    setShowReferralCode(true);
  };

  const handleReferralCodeConfirm = async (inviteCodeByReferral: string) => {
    logger('Referral code confirmed:', inviteCodeByReferral);
    // Handle referral code submission
    // You can add API call here

    const res: any = await userAPIs.setInviteCode({ inviteCodeByReferral });
    logger('Referral code submitted successfully:', res);

    if (res?.code !== 0) {
      await WebFPoint.showErrorToast({ message: res?.msg || 'Error: please check your referral code.' });
      return;
    }

    await WebFPoint.showSuccessToast({ message: res?.msg || 'Bind successful.' });
    setCodeBinded(true);
    setShowReferralCode(false);
  };

  const handleReferralCodeClose = () => {
    setShowReferralCode(false);
  };

  return (<>
    <MyPoints
      points={inviteInfo?.data?.totalPts || 0}
    />
    {/* {env === "dev1" && <div>
      <pre>1: {JSON.stringify(uniqueId, null, 2)}</pre>
      <pre>2: {JSON.stringify(userInfo, null, 2)}</pre>
      <pre>3: {JSON.stringify(inviteInfo, null, 2)}</pre>
    </div>} */}
    <div
      id="invite-friends"
      style={{
        width: 'calc(100% - 40px)',
        minHeight: '220px',
        display: 'flex',
        boxSizing: 'border-box',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px auto 20px',
        padding: '20px',
        gap: '20px',
        background: 'linear-gradient(121.99deg, rgba(37, 24, 6, 0.43) 0%, rgba(60, 47, 23, 0.75) 99.79%)',
        border: '1.5px solid #FFB23A',
        boxShadow: '2px 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(35px)',
        borderRadius: '12px',
        isolation: 'isolate'
      }}
    >
      {/* Top Section - Referral Statistics */}
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px', gap: '20px', width: '295px', height: '55px' }}>
        {/* Left Column - Friends referred */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0px', gap: '4px', width: '127.5px', height: '55px', flexGrow: 1 }}>
          <div style={{ fontWeight: 600, fontSize: '28px', lineHeight: '120%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#FFFFFF' }}>
            {String(userInfo?.data?.invitedWalletCount ?? 0)}
          </div>
          <div style={{ fontWeight: 400, fontSize: '12px', lineHeight: '140%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#969696' }}>
            Friends referred
          </div>
        </div>

        {/* Vertical divider */}
        <div style={{ width: '2px', height: '43.5px', background: 'rgba(255, 255, 255, 0.05)', flexShrink: 0 }}></div>

        {/* Right Column - Points earned */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0px', gap: '4px', width: '127.5px', height: '55px', flexGrow: 1 }}>
          <div style={{ fontWeight: 600, fontSize: '28px', lineHeight: '120%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#FFFFFF' }}>
            {String(userInfo?.data?.ptsByReferral ?? 0)}
          </div>
          <div style={{ fontWeight: 400, fontSize: '12px', lineHeight: '140%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#969696' }}>
            Points earned
          </div>
        </div>
      </div>

      {/* Middle Section - Invite Button */}
      <button
        id="invite-friends-button"
        disabled={!inviteInfo?.data?.inviteCode || isInviting}
        onClick={() => {
          const inviteCode = inviteInfo?.data?.inviteCode || '';
          if (inviteCode) {
            handleInvite(inviteCode);
          }
        }}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '15px 16px',
          gap: '8px',
          width: '100%',
          height: '50px',
          opacity: isInviting ? 0.6 : 1,
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(180deg, #FAC515 0%, #EAAC08 100%)',
          border: '1px solid #FAC515',
          boxShadow: 'inset 0px -2px 0px rgba(0, 0, 0, 0.4), inset 0px 2px 0px rgba(255, 255, 255, 0.4)',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'transform 0.2s'
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
        onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.16683 0.833008L16.6668 8.33301L9.16683 15.4163V10.833C3.3335 10.833 0.833496 17.083 0.833496 17.083C0.833496 9.99967 2.91683 5.41634 9.16683 5.41634V0.833008Z" fill="#171412" stroke="#171412" strokeWidth="1.66667" strokeLinejoin="round" />
        </svg>

        <span style={{ fontWeight: 600, fontSize: '16px', lineHeight: '140%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#171412', cursor: 'pointer' }}>
          Invite friends
        </span>
      </button>

      {/* Invited by Section */}
      {inviteInfo?.data?.referralWalletAvatar && inviteInfo?.data?.referralWalletName && <div
        style={{
          fontFamily: 'Sora',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '140%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#A9A29D',
          width: '100%',
          minHeight: '15px',
          flex: 'none',
          flexGrow: 0
        }}
      >
        {/* "Invited by" Text */}
        <span>
          Invited by
        </span>

        {inviteInfo?.data?.referralWalletAvatar && <span
          style={{
            margin: '0 5px',
            padding: '2px',
            width: '24px',
            height: '24px',
            background: '#A9E1B1',
            fontSize: '0',
            borderRadius: '50%',
          }}
        ><img src={inviteInfo?.data?.referralWalletAvatar || ''} alt="referral wallet avatar" style={{ width: '20px', height: '20px', borderRadius: '50%' }} /></span>}
        <span>
          @{inviteInfo?.data?.referralWalletName ?? '...'}
        </span>
      </div>}

      {(!inviteInfo?.data?.referralWalletAvatar || !inviteInfo?.data?.referralWalletName) && <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0px', gap: '8px', width: '295px', height: '48px'
      }}>
        {/* Enter referral code */}
        <div
          onClick={handleEnterCode}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0px',
            gap: '4px',
            width: '295px',
            height: '20px',
            cursor: 'pointer'
          }}
        >
          <span style={{ fontWeight: 500, fontSize: '14px', lineHeight: '140%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#FAFAF9', cursor: 'pointer' }}>
            Enter referral code
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12L10 8L6 4" stroke="#A9A29D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Timer */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px', gap: '8px', width: '157px', height: '20px' }}>
          {/* Days */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px', gap: '4px', height: '20px' }}>
            <div style={{ width: '20px', height: '20px', background: '#292524', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontWeight: 400, fontSize: '11px', lineHeight: '140%', color: '#FAFAF9' }}>
                {String(timer.days).padStart(2, '0')}
              </span>
            </div>
            <span style={{ fontWeight: 400, fontSize: '11px', lineHeight: '140%', color: '#A9A29D' }}>D</span>
          </div>

          {/* Hours */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px', gap: '4px', height: '20px' }}>
            <div style={{ width: '20px', height: '20px', background: '#292524', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontWeight: 400, fontSize: '11px', lineHeight: '140%', color: '#FAFAF9' }}>
                {String(timer.hours).padStart(2, '0')}
              </span>
            </div>
            <span style={{ fontWeight: 400, fontSize: '11px', lineHeight: '140%', color: '#A9A29D' }}>H</span>
          </div>

          {/* Minutes */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px', gap: '4px', height: '20px' }}>
            <div style={{ width: '20px', height: '20px', background: '#292524', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontWeight: 400, fontSize: '11px', lineHeight: '140%', color: '#FAFAF9' }}>
                {String(timer.minutes).padStart(2, '0')}
              </span>
            </div>
            <span style={{ fontWeight: 400, fontSize: '11px', lineHeight: '140%', color: '#A9A29D' }}>M</span>
          </div>

          {/* Seconds */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '0px', gap: '4px', height: '20px' }}>
            <div style={{ width: '20px', height: '20px', background: '#292524', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontWeight: 400, fontSize: '11px', lineHeight: '140%', color: '#FAFAF9' }}>
                {String(timer.seconds).padStart(2, '0')}
              </span>
            </div>
            <span style={{ fontWeight: 400, fontSize: '11px', lineHeight: '140%', color: '#A9A29D' }}>S</span>
          </div>
        </div>
      </div>}
    </div>

    {/* Referral Code Modal */}
    <ReferralCode
      referralCode={appParams?.code || ''}
      isOpen={showReferralCode}
      onClose={handleReferralCodeClose}
      onConfirm={handleReferralCodeConfirm}
    />
  </>);
}



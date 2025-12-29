import { useState, useEffect, useCallback } from 'react';
import ReferralCode from '../referral-code';
import { userAPIs } from '../../api/api';
import type { RequestType, GetUserInfoResponse, GetInviteInfoResponse } from '../../api/types';
import { WebFPoint } from '@wlfi/webf-point';
import MyPoints from '../my-points';

export default function InviteFriends() {
  const [timer, setTimer] = useState({ days: 6, hours: 23, minutes: 36, seconds: 51 });
  const [showReferralCode, setShowReferralCode] = useState(false);
  const [userInfo, setUserInfo] = useState<RequestType<GetUserInfoResponse["data"]> | null>(null);
  const [inviteInfo, setInviteInfo] = useState<RequestType<GetInviteInfoResponse["data"]> | null>(null);



  const [uniqueId, setUniqueId] = useState<string>('');
  const [referralCode, setReferralCode] = useState<string>('');

  const generateId = useCallback(async () => {
    if (WebFPoint.isAvailable()) {
      try {
        const result = await WebFPoint.generateUniqueId();
        const data = await userAPIs.regNewDevice({ deviceIdentity: result.id });
        setUniqueId(result.id + '\n' + JSON.stringify(data));
        console.log('Generate unique id result:', result);
      } catch (err) {
        console.error('Failed to generate unique id:', err);
      }
    }
  }, []);

  const refreshUserData = useCallback(async () => {
    if (!uniqueId) {
      return;
    }

    userAPIs.getUserInfo().then((res) => {
      console.log('User info:', res);
      setUserInfo(res);
    });

    userAPIs.getInviteInfo().then((res) => {
      console.log('Invite info:', res);
      setInviteInfo(res);
    });
  }, [uniqueId]);
  console.log('Getting user info...', userInfo, inviteInfo);

  // Generate unique ID using WebF plugin - only run once on mount
  useEffect(() => {
    generateId();
  }, [generateId]);

  // Set up method channel handlers - only run once on mount
  useEffect(() => {
    // Check if webf is available (WebF environment)
    if (typeof window !== 'undefined' && window.webf?.methodChannel) {
      const webf = window.webf;
      const methodChannel = webf.methodChannel;

      if (methodChannel) {
        methodChannel.addMethodCallHandler('receiveReferralCode', (params?: { code?: string }) => {
          const code = params?.code;
          if (!code) {
            throw new Error('Code is required');
          }
          setReferralCode(code);
          setShowReferralCode(true);
        });

        methodChannel.addMethodCallHandler('refreshData', () => {
          generateId();
          refreshUserData();
        });
      }
    }
  }, [generateId, refreshUserData]);

  // Refresh user data when uniqueId changes
  useEffect(() => {
    if (uniqueId) {
      refreshUserData();
    }
  }, [uniqueId, refreshUserData]);

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



  const handleInvite = async (code: string) => {
    if (!code) {
      throw new Error('Code is required');
    }
    const res = await WebFPoint.shareInviteCode({ code });
    console.log('Share invite code result:', res);
  };


  const handleEnterCode = () => {
    setShowReferralCode(true);
  };

  const handleReferralCodeConfirm = async (inviteCodeByReferral: string) => {
    console.log('Referral code confirmed:', inviteCodeByReferral);
    // Handle referral code submission
    // You can add API call here

    const res = await userAPIs.setInviteCode({ inviteCodeByReferral });
    console.log('Referral code submitted successfully:', res);
  };

  const handleReferralCodeClose = () => {
    setShowReferralCode(false);
  };

  if (!uniqueId) {
    return null;
  }


  return (<>
    <MyPoints
      points={inviteInfo?.data?.totalPts || 0}
    />
    {/* <pre>1: {JSON.stringify(uniqueId, null, 2)}</pre> */}
    {/* <pre>2: {JSON.stringify(userInfo, null, 2)}</pre> */}
    {/* <pre>3: {JSON.stringify(inviteInfo, null, 2)}</pre> */}
    <div
      id="invite-friends"
      style={{
        width: 'calc(100% - 40px)',
        height: '233px',
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
            {userInfo?.data?.inviteWalletCount || 0}
          </div>
          <div style={{ fontWeight: 400, fontSize: '12px', lineHeight: '140%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#969696' }}>
            {userInfo?.data?.ptsByReferral || 0}
          </div>
        </div>

        {/* Vertical divider */}
        <div style={{ width: '0px', height: '43.5px', border: '1px solid rgba(255, 255, 255, 0.05)' }}></div>

        {/* Right Column - Points earned */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0px', gap: '4px', width: '127.5px', height: '55px', flexGrow: 1 }}>
          <div style={{ fontWeight: 600, fontSize: '28px', lineHeight: '120%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#FFFFFF' }}>
            {inviteInfo?.data?.totalPts || 0}
          </div>
          <div style={{ fontWeight: 400, fontSize: '12px', lineHeight: '140%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#969696' }}>
            Points earned
          </div>
        </div>
      </div>

      {/* Middle Section - Invite Button */}
      <button
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
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0) 100%), #EAAC08',
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

        <span style={{ fontWeight: 600, fontSize: '16px', lineHeight: '140%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#171412' }}>
          Invite friends
        </span>
      </button>

      {/* Invited by Section */}
      {inviteInfo?.data?.referralWalletAvatar && inviteInfo?.data?.referralWalletName ? <div
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
          height: '15px',
          flex: 'none',
          flexGrow: 0
        }}
      >
        {/* "Invited by" Text */}
        <span>
          Invited by
        </span>

        <span
          style={{
            margin: '0 5px',
            padding: '2.72px 6.2px',
            background: '#A9E1B1',
            borderRadius: '50%',
          }}
        ><img src={inviteInfo?.data?.referralWalletAvatar} alt="referral wallet avatar" style={{ width: '20px', height: '20px' }} /></span>
        <span>
          @{inviteInfo?.data?.referralWalletName}
        </span>
      </div> :

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0px', gap: '8px', width: '295px', height: '48px' }}>
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
            <span style={{ fontWeight: 500, fontSize: '14px', lineHeight: '140%', display: 'flex', alignItems: 'center', textAlign: 'center', color: '#FAFAF9' }}>
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
    </div >

    {/* Referral Code Modal */}
    < ReferralCode
      referralCode={referralCode}
      isOpen={showReferralCode}
      onClose={handleReferralCodeClose}
      onConfirm={handleReferralCodeConfirm}
    />
  </>);
}



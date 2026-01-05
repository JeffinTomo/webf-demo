import { WebFPoint } from '@wlfi/webf-point';
import { useEffect, useState } from 'react';

export default function DailyRequest() {
  const [timeLeft, setTimeLeft] = useState({ hours: 10, minutes: 36 });

  useEffect(() => {
    // Countdown timer
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes } = prev;
        if (minutes > 0) {
          minutes--;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
        }
        return { hours, minutes };
      });
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const handleActivityClick = (activityId: string) => {
    console.log('Activity clicked:', activityId);
  };

  return (
    <div
      className="mx-auto my-[30px]"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '20px',
        width: '100%',
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px',
        width: '100%',
        height: '28px'
      }}>
        {/* Left side - Title */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '2px 0px',
          gap: '6px',
          height: '28px'
        }}>
          {/* Calendar Icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="#FAFAF9" strokeWidth="2" fill="none" />
            <path d="M16 2V6M8 2V6M3 10H21" stroke="#FAFAF9" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 14L10 16L13 13" stroke="#FAFAF9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <span style={{
            fontWeight: 600,
            fontSize: '18px',
            lineHeight: '140%',
            whiteSpace: 'nowrap',
            color: '#FAFAF9'
          }}>
            Daily quest
          </span>
        </div>

        {/* Right side - Timer */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0px',
          gap: '6px',
          height: '17px'
        }}>
          {/* Time Icon */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="6.67" stroke="#FFD83A" strokeWidth="1.33" fill="none" />
            <path d="M8 4.67V8L10.67 10.67" stroke="#FFD83A" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <span style={{
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '140%',
            whiteSpace: 'nowrap',
            color: '#FFD83A'
          }}>
            {timeLeft.hours}H：{String(timeLeft.minutes).padStart(2, '0')}M
          </span>
        </div>
      </div>

      {/* Activity Cards */}
      {/* Card 1: Purchase crypto - Completed */}
      <ActivityCard
        icon="purchase"
        title="Purchase crypto"
        subtitle=""
        progress={{ current: 340, total: 340 }}
        status="completed"
        onClick={() => WebFPoint?.navigateTo({ target: 'cryptoList' })}
      />

      {/* Card 2: Keep $1000+ in Savings - In Progress */}
      <ActivityCard
        icon="savings"
        title="Keep $1,000+ in Savings"
        subtitle=""
        progress={{ current: 12, total: 340 }}
        status="active"
        onClick={() => WebFPoint?.navigateTo({ target: 'earn' })}
      />

      {/* Card 3: Keep $1000+ balance - In Progress */}
      <ActivityCard
        icon="balance"
        title="Keep $1,000+ balance"
        subtitle=""
        progress={{ current: 212, total: 340 }}
        status="active"
        onClick={() => WebFPoint?.navigateTo({ target: 'addMoney' })}
      />
    </div>
  );
}

// Activity Card Component
interface ActivityCardProps {
  icon: string;
  title: string;
  subtitle?: string;
  progress: { current: number; total: number };
  status: 'completed' | 'active' | 'locked';
  onClick: () => void;
}

function ActivityCard({ icon, title, progress, status, onClick }: ActivityCardProps) {
  const progressPercent = (progress.current / progress.total) * 100;
  const isCompleted = status === 'completed';
  // const isActive = status === 'active';

  return (
    <div
      onClick={onClick}
      className="cursor-pointer active:scale-[0.98] transition-all"
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '16px',
        gap: '10px',
        width: '100%',
        height: '74px',
        background: '#201D1B',
        borderRadius: '12px',
        cursor: 'pointer'
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px',
        gap: '60px',
        width: '100%',
        height: '42px'
      }}>
        {/* Left side - Icon + Text */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0px',
          gap: '10px',
          width: 'calc(100% - 132px)',
          height: '42px'
        }}>
          {/* Icon */}
          {renderIcon(icon)}

          {/* Text Content */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            height: '42px',
            gap: '2px'
          }}>
            <div style={{
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '140%',
              color: isCompleted ? '#D9D9D9' : '#FAFAF9'
            }}>
              {title}
            </div>

            {/* Progress Bar */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '0px',
              gap: '10px',
              height: '15px',
              width: 'calc(100% - 2px)'
            }}>
              {/* Progress Bar Background */}
              <div style={{
                position: 'relative',
                width: '130px',
                height: '6px',
                background: isCompleted ? '#2C2C36' : '#44403C',
                border: isCompleted ? '1px solid #292524' : 'none',
                borderRadius: '8px'
              }}>
                {/* Progress Fill */}
                {progressPercent > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: `${progressPercent}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #FFD664 0%, #E7AC08 100%)',
                    borderRadius: '8px'
                  }} />
                )}
              </div>

              {/* Progress Text */}
              <span style={{
                fontWeight: 500,
                fontSize: '11px',
                lineHeight: '140%',
                color: '#79716B',
                whiteSpace: 'nowrap'
              }}>
                {progress.current} / {progress.total}
              </span>
            </div>
          </div>
        </div>

        {/* Right side - Action Button */}
        {isCompleted ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12L10 17L20 7" stroke="#47CD89" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.875 12.4248L6.64971 6.6501L0.875 0.875393" stroke="#79716B" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

        )}
      </div>
    </div>
  );
}

// Icon renderer function
function renderIcon(icon: string) {
  const iconSize = { width: '40px', height: '40px' };

  if (icon === 'purchase') {
    return (
      <div style={{
        ...iconSize,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#292524',
        borderRadius: '50%'
      }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 40C8.95431 40 0 31.0458 0 20C0 8.95432 8.95431 0 20 0C31.0456 0 40 8.95432 40 20C40 31.0458 31.0456 40 20 40Z" fill="#292524" />
          <path d="M15 29.5C12.5147 29.5 10.5 27.4853 10.5 25C10.5 22.5147 12.5147 20.5 15 20.5C17.4853 20.5 19.5 22.5147 19.5 25C19.5 27.4853 17.4853 29.5 15 29.5ZM25 19.5C22.5147 19.5 20.5 17.4853 20.5 15C20.5 12.5147 22.5147 10.5 25 10.5C27.4853 10.5 29.5 12.5147 29.5 15C29.5 17.4853 27.4853 19.5 25 19.5ZM15 27.5C16.3807 27.5 17.5 26.3807 17.5 25C17.5 23.6193 16.3807 22.5 15 22.5C13.6193 22.5 12.5 23.6193 12.5 25C12.5 26.3807 13.6193 27.5 15 27.5ZM25 17.5C26.3807 17.5 27.5 16.3807 27.5 15C27.5 13.6193 26.3807 12.5 25 12.5C23.6193 12.5 22.5 13.6193 22.5 15C22.5 16.3807 23.6193 17.5 25 17.5ZM11 16C11 13.2386 13.2386 11 16 11H19V13H16C14.3432 13 13 14.3432 13 16V19H11V16ZM29 21H27V24C27 25.6569 25.6569 27 24 27H21V29H24C26.7614 29 29 26.7614 29 24V21Z" fill="white" />
        </svg>
      </div>
    );
  }

  if (icon === 'savings') {
    return (
      <div style={{
        ...iconSize,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#292524',
        borderRadius: '88.8889px',
        position: 'relative'
      }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="20" fill="#292524" />
          <path fillRule="evenodd" clipRule="evenodd" d="M19.9997 10.83C16.3434 10.83 13.3793 13.794 13.3793 17.4504C13.3793 19.3686 14.1938 21.095 15.4988 22.3055L14.1136 23.799C12.4104 22.2192 11.3423 19.9588 11.3423 17.4504C11.3423 12.669 15.2183 8.79297 19.9997 8.79297C24.781 8.79297 28.6571 12.669 28.6571 17.4504C28.6571 21.2215 26.2465 24.4269 22.8854 25.6149L22.2066 23.6943C24.7793 22.785 26.6201 20.3313 26.6201 17.4504C26.6201 13.794 23.656 10.83 19.9997 10.83Z" fill="white" />
          <path fillRule="evenodd" clipRule="evenodd" d="M15.6343 14.9111C15.2104 15.2808 15.1664 15.9242 15.5362 16.3481L18.2539 19.4643C18.4625 19.7035 18.7706 19.8317 19.0873 19.8112C19.404 19.7908 19.693 19.6239 19.869 19.3598L21.1898 17.3786L22.9134 19.4469C23.2735 19.879 23.9157 19.9374 24.3479 19.5773C24.78 19.2172 24.8384 18.5749 24.4783 18.1428L21.8818 15.027C21.676 14.7802 21.3656 14.6445 21.0447 14.6616C20.7238 14.6788 20.4298 14.8463 20.2515 15.1137L18.9133 17.1211L17.0714 15.0092C16.7016 14.5853 16.0583 14.5414 15.6343 14.9111Z" fill="white" />
          <path fillRule="evenodd" clipRule="evenodd" d="M26.7045 21.7217C27.9055 20.8207 29.6222 21.157 30.3947 22.4444C31.035 23.5116 30.8047 24.8861 29.8513 25.6862L25.2777 29.5249C23.9843 30.6104 22.3498 31.2054 20.6613 31.2054H9.30612C8.7436 31.2054 8.2876 30.7494 8.2876 30.1869C8.2876 29.6244 8.7436 29.1684 9.30612 29.1684H20.6613C21.8708 29.1684 23.0417 28.7422 23.9681 27.9646L28.5417 24.1259C28.728 23.9696 28.7731 23.701 28.6479 23.4924C28.497 23.2408 28.1615 23.1751 27.9268 23.3512L23.1653 26.9229C22.9849 27.0582 22.7654 27.1314 22.5399 27.1314H18.7914C18.2289 27.1314 17.7728 26.6754 17.7728 26.1129C17.7728 25.5503 18.2289 25.0943 18.7914 25.0943H20.9016L20.8982 24.0758H15.5331C14.7419 24.0758 14.0223 24.5339 13.6874 25.2508L13.2206 26.2502C12.9695 26.7878 12.4298 27.1314 11.8364 27.1314H9.30612C8.7436 27.1314 8.2876 26.6754 8.2876 26.1129C8.2876 25.5503 8.7436 25.0943 9.30612 25.0943H11.5122L11.8418 24.3887C12.5115 22.955 13.9507 22.0388 15.5331 22.0388H21.001C22.0666 22.0388 22.9315 22.9008 22.9349 23.9665L22.9368 24.5478L26.7045 21.7217Z" fill="white" />
        </svg>
      </div>
    );
  }

  if (icon === 'balance') {
    return (
      <div style={{
        ...iconSize,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#292524',
        borderRadius: '50%',
        width: '40px',
        position: 'relative'
      }}>
        <svg width="36" height="36" viewBox="-2 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="20" fill="#292524" />
          <rect x="9.70801" y="14.25" width="19.8713" height="14.5723" rx="2" stroke="white" strokeWidth="2" />
          <path d="M21.8809 19.8047C21.8809 19.2524 22.3286 18.8047 22.8809 18.8047H28.7805V24.2578H22.8809C22.3286 24.2578 21.8809 23.8101 21.8809 23.2578V19.8047Z" stroke="white" strokeWidth="2" />
          <path d="M22.8818 14.313C22.8818 11.5427 20.636 9.29688 17.8657 9.29688C15.0954 9.29688 12.8496 11.5427 12.8496 14.313" stroke="white" strokeWidth="2" />
        </svg>

      </div>
    );
  }

  return null;
}


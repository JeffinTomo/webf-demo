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
            <path d="M9 2V4H15V2H17V4H21C21.5523 4 22 4.44772 22 5V21C22 21.5523 21.5523 22 21 22H3C2.44772 22 2 21.5523 2 21V5C2 4.44772 2.44772 4 3 4H7V2H9ZM20 11H4V20H20V11ZM15.0355 12.136L16.4497 13.5503L11.5 18.5L7.96447 14.9645L9.37868 13.5503L11.5 15.6716L15.0355 12.136ZM7 6H4V9H20V6H17V7H15V6H9V7H7V6Z" fill="#FAFAF9" />
          </svg>

          <span style={{
            fontFamily: 'Sora',
            fontWeight: 600,
            fontSize: '20px',
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
            fontFamily: 'Sora',
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
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '12px',
        width: '100%'
      }}>
        <ActivityCard
          title="Trade crypto"
          progress={{ current: 66, total: 340 }}
          description="Earn up to 340 points daily by trading crypto."
          onClick={() => WebFPoint?.navigateTo({ target: 'cryptoList' })}
        />

        <ActivityCard
          title="Keep $1,000+ in Earn"
          progress={{ current: 86, total: 340 }}
          description="Earn up to 340 points daily by maintaining a total deposit of $1,000 or more in Earn."
          onClick={() => WebFPoint?.navigateTo({ target: 'earn' })}
        />

        <ActivityCard
          title="Keep $1,000+ in WLFI balance"
          progress={{ current: 203, total: 340 }}
          description="Earn up to 340 points daily by maintaining a WLFI balance of $1,000 or more."
          onClick={() => WebFPoint?.navigateTo({ target: 'addMoney' })}
        />
      </div>
    </div>
  );
}

// Activity Card Component
interface ActivityCardProps {
  title: string;
  progress: { current: number; total: number };
  description: string;
  onClick: () => void;
}

function ActivityCard({ title, progress, description, onClick }: ActivityCardProps) {
  const progressPercent = (progress.current / progress.total) * 100;

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
        width: '100%',
        background: '#201D1B',
        borderRadius: '12px',
        cursor: 'pointer'
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '20px',
        width: '100%'
      }}>
        {/* Title */}
        <div style={{
          fontFamily: 'Sora',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '140%',
          color: '#FAFAF9',
          whiteSpace: 'nowrap'
        }}>
          {title}
        </div>

        {/* Progress Bar Section */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '8px',
          width: '100%'
        }}>
          {/* Progress Bar */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '6px',
            background: '#44403C',
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
                background: 'linear-gradient(90deg, #FFECB8 0%, #E7AC08 100%)',
                borderRadius: '8px'
              }} />
            )}
          </div>

          {/* Progress Text and Description */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '12px',
            width: '100%'
          }}>
            {/* Earned / To Go */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%'
            }}>
              <span style={{
                fontFamily: 'Sora',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '140%',
                color: '#FAFAF9',
                whiteSpace: 'nowrap'
              }}>
                {progress.current} Earned
              </span>
              <span style={{
                fontFamily: 'Sora',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '140%',
                color: '#FAFAF9',
                textAlign: 'right',
                whiteSpace: 'nowrap'
              }}>
                {progress.total - progress.current} To Go
              </span>
            </div>

            {/* Description */}
            <div style={{
              fontFamily: 'Sora',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '140%',
              color: '#79716B',
              width: '100%'
            }}>
              {description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



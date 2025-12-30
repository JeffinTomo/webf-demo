import { useEffect } from 'react';
import type { ActivityItem } from '../../api/types';
import star2Icon from '../../assets/star2.png';

export default function NewUserRequest() {
  const activity = {
    'activity-id': '123',
    logo: 'https://via.placeholder.com/150',
    title: 'Purchase crypto more than $50',
    tx_time: '2021-01-01',
    status: 'available',
    points: 100
  };

  useEffect(() => {
  }, []);


  const handleActivityClick = (activity: ActivityItem) => {
    // Handle activity action
    console.log('Activity clicked:', activity);
    // In a real app, this would trigger the activity completion flow
  };

  return (
    <div
      className="mx-auto my-[30px]"
      style={{
        width: '100%',
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '2px 0px',
        gap: '6px',
        height: '28px'
      }}>
        {/* Medal Icon */}
        <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 5.001C12.4183 5.001 16 8.58271 16 13.001C16 17.4193 12.4183 21.001 8 21.001C3.58172 21.001 0 17.4193 0 13.001C0 8.58271 3.58172 5.001 8 5.001ZM8 7.001C4.68629 7.001 2 9.68731 2 13.001C2 16.3147 4.68629 19.001 8 19.001C11.3137 19.001 14 16.3147 14 13.001C14 9.68731 11.3137 7.001 8 7.001ZM8 8.50101L9.3225 11.1807L12.2798 11.6104L10.1399 13.6963L10.645 16.6416L8 15.251L5.35497 16.6416L5.86012 13.6963L3.72025 11.6104L6.6775 11.1807L8 8.50101ZM14 0.000999928V3.001L12.6366 4.13856C11.5305 3.55871 10.3025 3.17985 9.0011 3.05049L9 0L14 0.000999928ZM7 0L6.9997 3.0504C5.6984 3.17964 4.47046 3.55836 3.36441 4.13804L2 3.001V0.000999928L7 0Z" fill="#FAFAF9" />
        </svg>


        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0px',
          gap: '4px'
        }}>
          <span style={{
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '140%',
            color: '#FAFAF9'
          }}>
            New user quest
          </span>

          {/* Question Icon */}
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.71926 4.66639C4.8564 4.27653 5.1271 3.94778 5.4834 3.73838C5.8397 3.52898 6.25861 3.45244 6.66595 3.5223C7.07328 3.59217 7.44274 3.80394 7.70889 4.12011C7.97504 4.43628 8.12071 4.83644 8.12009 5.24972C8.12009 6.41639 6.37009 6.99972 6.37009 6.99972M6.41671 9.33301H6.42254M12.25 6.41634C12.25 9.638 9.63837 12.2497 6.41671 12.2497C3.19505 12.2497 0.583374 9.638 0.583374 6.41634C0.583374 3.19468 3.19505 0.583008 6.41671 0.583008C9.63837 0.583008 12.25 3.19468 12.25 6.41634Z" stroke="#79716B" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

        </div>
      </div>

      {/* Quest Cards */}
      <div
        key={activity['activity-id']}
        onClick={() => handleActivityClick(activity)}
        className="cursor-pointer active:scale-[0.98] transition-all"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '22px 20px',
          isolation: 'isolate',
          marginTop: '20px',
          width: '100%',
          height: '101px',
          background: 'linear-gradient(180deg, #421E06 0%, #713C12 100%)',
          borderRadius: '12px',
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}
      >
        <div style={{
          position: 'absolute',
          top: '-12px',
          right: '0',
          width: '96px',
          height: '100%',
          opacity: 0.2,
          zIndex: 1
        }}>
          <img
            src={star2Icon}
            alt="Star icon"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: '0px',
          gap: '60px',
          width: '100%',
          position: 'relative',
          zIndex: 1
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '2px',
            flex: 1
          }}>
            <div style={{
              fontFamily: 'Sora',
              fontWeight: 600,
              fontSize: '18px',
              lineHeight: '140%',
              color: '#FEEC8A'
            }}>
              Get {activity.points} Points
            </div>
            <div style={{
              fontFamily: 'Sora',
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '140%',
              color: '#FAFAF9'
            }}>
              {activity.title}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleActivityClick(activity);
            }}
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '8px',
              gap: '4px',
              width: '32px',
              height: '32px',
              background: '#EAAC08',
              borderRadius: '99px',
              border: 'none',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.12868 6.58363L9.53674e-07 6.58363V5.08363L9.12868 5.08363L5.1057 1.06066L6.16635 -2.54997e-07L12 5.83363L6.16635 11.6673L5.1057 10.6066L9.12868 6.58363Z" fill="black" />
            </svg>

          </button>
        </div>
      </div>
    </div>
  );
}


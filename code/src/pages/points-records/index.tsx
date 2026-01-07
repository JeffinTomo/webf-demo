import { useState } from 'react';
import { WebFListView } from '../../components/webf-listview';

export default function PointsRecordsPage() {

  // Mock data for demonstration
  const initialRecordsData = [
    {
      date: '12/07/2024',
      records: [
        { id: '1', title: 'Daily Checking', subtitle: 'Check in', status: 'pending', points: 20 },
        { id: '2', title: 'Keep Balance', subtitle: 'Check in', status: 'pending', points: 20 },
        { id: '3', title: 'Swap', subtitle: 'Check in', points: 50 },
        { id: '4', title: 'Invite new friend', subtitle: 'Check in', subtext: 'Check in', points: 100 },
      ]
    },
    {
      date: '09/07/2024',
      records: [
        { id: '5', title: 'Hold & Earn', subtitle: 'Check in', points: 50 },
        { id: '6', title: 'Purchase crypto', subtitle: 'Check in', points: 30 },
        { id: '7', title: 'Deposit USD1', subtitle: 'Check in', points: 20 },
        { id: '8', title: 'Invite Friend', subtitle: 'Check in', points: 20 },
        { id: '9', title: 'Link social media', subtitle: 'Check in', points: 20 },
      ]
    }
  ];

  const [recordsData, setRecordsData] = useState(initialRecordsData);

  const handleRefresh = () => {
    console.log('Refreshing points records...');
    // Simulate refresh - reset to initial data
    setTimeout(() => {
      setRecordsData(initialRecordsData);
      console.log('Refresh complete');
    }, 1000);
  };

  const handleLoadMore = () => {
    console.log('Loading more records...');
    // Simulate loading more data
    setTimeout(() => {
      const newSection = {
        date: '05/07/2024',
        records: [
          { id: `${Date.now()}-1`, title: 'Daily Checking', subtitle: 'Check in', points: 20 },
          { id: `${Date.now()}-2`, title: 'Keep Balance', subtitle: 'Check in', points: 30 },
        ]
      };
      setRecordsData([...recordsData, newSection]);
      console.log('Loaded more items');
    }, 1000);
  };

  return (
    // <div style={{
    //   display: 'flex',
    //   flexDirection: 'column',
    //   height: '100vh',
    //   width: '100%',
    //   overflow: 'hidden'
    // }}>
    <WebFListView
      onRefresh={handleRefresh}
      onLoadmore={handleLoadMore}
      style={{
        flex: 1,
        width: '100%',
        height: '100vh'
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '24px 0px',
        gap: '24px',
        margin: '0 auto'
      }}>
        {recordsData.map((section, sectionIndex) => (
          <div key={sectionIndex} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            width: '100%'
          }}>
            {/* Date Header */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 20px',
              width: '100%',
              height: '40px',
              boxSizing: 'border-box'
            }}>
              <span style={{
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '140%',
                color: '#79716B'
              }}>
                {section.date}
              </span>
            </div>

            {/* Records */}
            {section.records.map((record) => (
              <RecordItem key={record.id} {...record} />
            ))}
          </div>
        ))}
      </div>
    </WebFListView>
    // </div>
  );
}

// Record Item Component
interface RecordItemProps {
  title: string;
  subtitle?: string;
  subtext?: string;
  status?: string;
  points: number;
}

function RecordItem({ title, subtitle, subtext, status, points }: RecordItemProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 20px',
      width: '100%',
      height: status ? '80px' : '80px',
      boxSizing: 'border-box'
    }}>
      {/* Left side -  Text */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0px',
        gap: '12px'
      }}>
        {/* Text Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '0px',
          gap: '2px'
        }}>
          {/* Title with optional status */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0px',
            gap: '4px'
          }}>
            <span style={{
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '140%',
              color: '#D9D9D9'
            }}>
              {title}
            </span>

            {status && (
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '4px 6px',
                gap: '2px',
                background: 'rgba(223, 145, 0, 0.1)',
                borderRadius: '6px'
              }}>
                <span style={{
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '140%',
                  color: '#FFAD32'
                }}>
                  Pending
                </span>
              </div>
            )}
          </div>

          {/* Subtitle */}
          {subtitle && (
            <span style={{
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '140%',
              color: '#79716B'
            }}>
              {subtitle}
            </span>
          )}

          {/* Additional subtext */}
          {subtext && (
            <span style={{
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '140%',
              color: '#79716B'
            }}>
              {subtext}
            </span>
          )}
        </div>
      </div>

      {/* Right side - Points */}
      <span style={{
        fontWeight: 500,
        fontSize: '16px',
        lineHeight: '140%',
        color: points >= 0 ? '#47CD89' : '#FF4D4D'
      }}>
        {points > 0 ? '+' : ''}{points}
      </span>
    </div>
  );
}



import starIcon from '../../assets/star.png';

interface MyPointsProps {
  points: number;
}

export default function MyPoints({ points }: MyPointsProps) {
  return (
    <div
      className="mx-auto mb-4 rounded-lg"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px'
      }}
    >
      {/* Title - My WLFI Points */}
      <div
        style={{
          width: '100%',
          height: '20px',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '140%',
          textAlign: 'center',
          color: '#79716B',
          boxSizing: 'border-box'
        }}
      >
        My WLFI Points
      </div>

      {/* Points display with icon */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0px',
          gap: '8px',
          width: '100%',
          height: '55px'
        }}
      >
        {/* Icon: Badge with hexagon and star */}
        <div style={{ width: '34px', height: '34px', position: 'relative', flexShrink: 0, top: '-1px' }}>
          <img
            src={starIcon}
            alt="Star icon"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>

        {/* Points number */}
        <div
          style={{
            fontFamily: 'Sora',
            height: '55px',
            fontWeight: 600,
            fontSize: '46px',
            lineHeight: '120%',
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            color: '#FFD83A'
          }}
        >
          {points.toLocaleString()}
        </div>
      </div>
    </div>
  );
}


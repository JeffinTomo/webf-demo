import { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'What is WLP?',
    answer: 'WLP is the WLFI Loyalty Points launched by World Liberty Financial, and users holding WLP will receive mysterious rewards in the future.'
  },
  {
    id: '2',
    question: 'What does it mean when points are in Pending status?',
    answer: 'Pending status means your points are being processed and will be available soon.'
  },
  {
    id: '3',
    question: 'What does the countdown next to the daily tasks mean?',
    answer: 'The countdown shows the time remaining until the daily tasks reset.'
  },
  {
    id: '4',
    question: 'Why is there a limit on the points that can be earned daily?',
    answer: 'Daily limits help ensure fair distribution of rewards and maintain the value of the loyalty program.'
  },
  {
    id: '5',
    question: 'Why is there a limit?',
    answer: 'Limits are set to ensure sustainable reward distribution and prevent abuse of the system.'
  },
  {
    id: '6',
    question: 'Why is there a limit on the points that can be earned daily?',
    answer: 'Daily earning limits help maintain the integrity and long-term sustainability of the rewards program.'
  }
];

function FAQItemComponent({ item, index, isOpen, onToggle }: { item: FAQItem; index: number; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '16px 0px 0',
        gap: '8px',
        width: '100%',
        borderTop: index === 0 ? 'none' : '1px solid #44403C'
      }}
    >
      {/* Question Title */}
      <div
        onClick={onToggle}
        className="cursor-pointer active:opacity-70 transition-opacity"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '0px',
          gap: '4px',
          width: '100%'
        }}
      >
        <span style={{
          fontFamily: 'Sora',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '140%',
          color: '#FAFAF9',
          flex: 1
        }}>
          {item.question}
        </span>

        {/* Arrow Icon */}
        <div style={{
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          position: 'relative'
        }}>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
            position: 'absolute',
            transform: isOpen
              ? 'matrix(0.71, 0.71, 0.71, -0.71, 0, 0)'
              : 'rotate(-45deg)',
            transition: 'transform 0.2s'
          }}>
            <path d="M0 0L8 0L8 8" stroke="#A9A29D" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Answer Text */}
      {isOpen && (
        <div style={{
          width: '100%',
          paddingTop: '8px'
        }}>
          <span style={{
            fontFamily: 'Sora',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '140%',
            color: '#A9A29D',
            display: 'flex',
            alignItems: 'center'
          }}>
            {item.answer}
          </span>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(['1'])); // 第一个默认展开

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '0',
        gap: '20px',
        width: 'calc(100% - 40px)',
        margin: '0 auto',
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
        {/* Left side - Title with Question Icon */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '2px 0px',
          gap: '7px',
          height: '28px'
        }}>
          {/* Question Mark Icon */}
          <div style={{
            width: '24px',
            height: '24px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Question mark circle */}
              <circle cx="12" cy="12" r="9" stroke="#FAFAF9" strokeWidth="2" fill="none" />
              {/* Question mark top */}
              <path d="M12 8V8C12 7 13 6 14 6C15 6 16 7 16 8C16 9 15 10 14 10" stroke="#FAFAF9" strokeWidth="2" strokeLinecap="round" fill="none" />
              {/* Question mark dot */}
              <circle cx="12" cy="16" r="1" fill="#FAFAF9" />
            </svg>
          </div>

          <span style={{
            fontFamily: 'Sora',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '140%',
            color: '#FAFAF9'
          }}>
            FAQ
          </span>
        </div>
      </div>

      {/* FAQ Content Card */}
      <div style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '10px 16px 30px',
        gap: '16px',
        width: '100%',
        background: '#201D1B',
        borderRadius: '12px'
      }}>
        {faqData.map((item, index) => (
          <FAQItemComponent
            key={item.id}
            item={item}
            index={index}
            isOpen={openItems.has(item.id)}
            onToggle={() => toggleItem(item.id)}
          />
        ))}
      </div>
    </div>
  );
}


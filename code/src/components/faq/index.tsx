import { useState } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    question: 'What is the WLFI Points Program?',
    answer: 'The WLFI Points Program is officially launched by World Liberty Financial. Users who hold the WLFI points will be eligible to receive exclusive rewards in the future.'
  },
  {
    id: '2',
    question: 'Why is there a daily limit on points?',
    answer: 'To keep the WLFI Points Program fair for everyone, a daily points cap for each quest has been set. After reaching the limit, you can continue earning points after the reset at 12:00 AM Eastern Time.'
  },
  {
    id: '3',
    question: 'What is the purpose of the countdown in the daily quest?',
    answer: 'Points earned from each daily quest reset at 12:00 AM Eastern Time. If you\'ve reached the daily point cap, you can resume earning points after the reset. The countdown indicates the time remaining until the next reset at 12:00 AM Eastern Time.'
  },
  {
    id: '4',
    question: 'What does "Pending" status mean?',
    answer: 'Points are settled daily at 12:00 AM Eastern Time. Points earned before this time appear as "Pending" and will be officially credited after the daily settlement.'
  },
  {
    id: '5',
    question: 'How do I earn rewards by inviting friends?',
    answer: 'Click "Invite Friend" to share your invitation code. (Your friends must enter the code within 7 days of joining the program.) Once they do, you\'ll automatically earn 25% of their points as a reward whenever they earn points.'
  },
  {
    id: '6',
    question: 'What do the numbers (e.g., 340/340) in daily quests mean?',
    answer: 'The format is: [Points Earned] / [Daily Limit]\n\nExamples:\n• 0 / 340: You can continue earning points until you reach the daily limit.\n• 340 / 340: Daily limit reached.'
  },
  {
    id: '7',
    question: 'Are WLFI points backed by or linked to any monetary value or exchange rate?',
    answer: 'No. WLFI makes no guarantees regarding its future value or financial monetization.'
  },
  {
    id: '8',
    question: 'Can I transfer or trade points?',
    answer: 'No. Points are tied to your account and cannot be transferred, traded, or withdrawn.'
  },
  {
    id: '9',
    question: 'Can I join the program with more than one account?',
    answer: 'Only one account per device is permitted.\nMalicious activities (e.g., point farming, batch registrations) are strictly prohibited. Any violations may result in point forfeiture or account suspension.'
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
          padding: '0px',
          gap: '4px',
          width: '100%',
        }}
      >
        <span style={{
          fontFamily: 'Sora',
          fontStyle: 'normal',
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
          width: '14px',
          height: '14px',
          display: 'flex',
          textAlign: 'right',
          position: 'relative',
          top: isOpen ? '2px' : '8px'
        }}>
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
            transform: isOpen ? 'matrix(0.71, 0.71, 0.71, -0.71, 0, 0)' : 'rotate(-45deg)',
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
          <div style={{
            fontFamily: 'Sora',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '140%',
            color: '#A9A29D',
            whiteSpace: 'pre-line'
          }}>
            {item.answer}
          </div>
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
              <path d="M19.5 3H4.5C3.67158 3 3 3.67158 3 4.5V19.5C3 20.3285 3.67158 21 4.5 21H19.5C20.3285 21 21 20.3285 21 19.5V4.5C21 3.67158 20.3285 3 19.5 3Z" stroke="#FAFAF9" strokeWidth="2" strokeLinejoin="round" />
              <path d="M12 14.3125V12.3125C13.6568 12.3125 15 10.9693 15 9.3125C15 7.65565 13.6568 6.3125 12 6.3125C10.3432 6.3125 9 7.65565 9 9.3125" stroke="#FAFAF9" strokeWidth="2" strokeLinejoin="round" />
              <path fillRule="evenodd" clipRule="evenodd" d="M12 18.8125C12.6904 18.8125 13.25 18.2529 13.25 17.5625C13.25 16.8722 12.6904 16.3125 12 16.3125C11.3097 16.3125 10.75 16.8722 10.75 17.5625C10.75 18.2529 11.3097 18.8125 12 18.8125Z" fill="#FAFAF9" />
            </svg>

          </div>

          <span style={{
            fontStyle: 'normal',
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


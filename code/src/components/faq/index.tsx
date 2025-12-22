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
    answer: 'WLP stands for WLFI Loyalty Points, officially launched by World Liberty Financial. Users who hold WLP will be eligible to receive exclusive rewards in the future.'
  },
  {
    id: '2',
    question: 'What does "Pending" status mean?',
    answer: 'Points are distributed daily at 12:00 AM Estern Time. Points earned before this time will appear as "Pending" and will be officially credited after the daily settlement.'
  },
  {
    id: '3',
    question: 'What is the purpose of the countdown in the daily quest?',
    answer: 'Daily tasks reset at 12:00 AM Estern Time. If the daily point cap has been reached, you can resume earning points after the reset.'
  },
  {
    id: '4',
    question: 'Why is there a daily limit on points?',
    answer: 'To keep the system fair for everyone, we\'ve set a daily points cap. After reaching the limit, you can continue earning points after the reset at 12:00 AM Estern Time.'
  },
  {
    id: '5',
    question: 'How do I earn rewards by inviting friends?',
    answer: 'Click "Invite Friend" to share your invitation. When your referred friends earn points, you\'ll automatically receive 25% of their points as a reward.'
  },
  {
    id: '6',
    question: 'What do the numbers (e.g., 340/340) in daily tasks mean?',
    answer: 'The format is: [Points Earned] / [Daily Limit]\n\nExamples:\n• 340 / 340: Daily limit reached.\n• 0 / 340: You can continue earning points until you reach the daily limit.'
  },
  // {
  //   id: '7',
  //   question: 'What is USD1?',
  //   answer: 'USD1 is a stablecoin by World Liberty Financial, pegged 1:1 to the US Dollar.\n\nYou earn WLP by trading or holding USD1. Larger amounts generate more points.'
  // },
  {
    id: '8',
    question: 'Is WLP backed by or tied to any monetary value or exchange rate?',
    answer: 'No. WLP serves only as a proof of loyalty. WLFI makes no guarantees regarding WLP\'s future value, exchange ratios, or financial monetization of WLP.'
  },
  {
    id: '9',
    question: 'Can I transfer or trade WLP points?',
    answer: 'No. WLP points are tied to your account and cannot be transferred, traded, or withdrawn.'
  },
  {
    id: '10',
    question: 'Can I join the loyalty program with more than one account?',
    answer: 'Only one account per device is permitted. Malicious activities (e.g., point farming, batch registrations) are strictly prohibited. Any violations may result in point forfeiture or permanent account suspension.'
  },
  {
    id: '11',
    question: 'What is the difference between "Trade any token" and "Trade USD1"?',
    answer: '• Swap any trading pair: Swapping ANY tokens earns you base points.\n\n• Trade USD1: This requires USD1 in the trading pair and grants bonus WLP rewards in addition to the base points.'
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
          <div style={{
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
              {/* Question mark circle */}
              <circle cx="12" cy="12" r="9" stroke="#FAFAF9" strokeWidth="2" fill="none" />
              {/* Question mark top */}
              <path d="M12 8V8C12 7 13 6 14 6C15 6 16 7 16 8C16 9 15 10 14 10" stroke="#FAFAF9" strokeWidth="2" strokeLinecap="round" fill="none" />
              {/* Question mark dot */}
              <circle cx="12" cy="16" r="1" fill="#FAFAF9" />
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


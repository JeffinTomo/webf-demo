import { useState, useEffect } from 'react';

interface ReferralCodeProps {
  referralCode: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (code: string) => void;
}

export default function ReferralCode({ isOpen, onClose, onConfirm, referralCode }: ReferralCodeProps) {
  const [code, setCode] = useState(referralCode);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setCode(text);
    } catch (error) {
      console.error('Failed to read clipboard:', error);
    }
  };

  const handleConfirm = () => {
    if (code.trim()) {
      onConfirm(code.trim());
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        id="referral-code-backdrop"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          zIndex: 9998,
          animation: 'fadeIn 0.3s ease-out'
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#171412',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          padding: '24px 20px 32px',
          zIndex: 9999,
          animation: 'slideUp 0.3s ease-out',
          boxSizing: 'border-box'
        }}
      >
        {/* Title */}
        <div
          style={{
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '140%',
            textAlign: 'left',
            color: '#FFFFFF',
            marginBottom: '24px'
          }}
        >
          Enter your referral code
        </div>

        {/* Input Field */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '12px 16px',
            gap: '8px',
            width: '100%',
            height: '48px',
            background: '#171412',
            border: '1px solid #3A3A3A',
            borderRadius: '12px',
            marginBottom: '20px',
            boxSizing: 'border-box'
          }}
        >
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter code"
            style={{
              flex: 1,
              fontFamily: 'Sora',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#FFFFFF',
              fontSize: '16px',
              lineHeight: '140%',
              fontWeight: 400
            }}
          />
          <button
            onClick={handlePaste}
            style={{
              padding: '4px 12px',
              background: 'transparent',
              border: 'none',
              color: '#EAAC08',
              fontSize: '14px',
              lineHeight: '140%',
              fontWeight: 500,
              fontFamily: 'Sora',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            Paste
          </button>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '14px',
            gap: '8px',
            width: '100%',
            height: '48px',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%), linear-gradient(180deg, #FAC515 0%, #EAAC08 100%)',
            border: '1px solid #FAC515',
            borderRadius: '12px',
            cursor: 'pointer',
            marginBottom: '16px',
            boxShadow: '0px 2px 8px rgba(234, 172, 8, 0.3)',
            transition: 'transform 0.2s, opacity 0.2s'
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
          onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <span
            style={{
              fontWeight: 600,
              fontSize: '16px',
              lineHeight: '140%',
              color: '#000000'
            }}
          >
            Confirm
          </span>
        </button>

        {/* Maybe Later Link */}
        <div
          onClick={onClose}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '8px',
            cursor: 'pointer'
          }}
        >
          <span
            style={{
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '140%',
              color: '#969696',
              textAlign: 'center'
            }}
          >
            Maybe later
          </span>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}


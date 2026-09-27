import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { LiquidGlassContainer } from './LiquidGlassContainer';
import { LiquidGlassButton } from './LiquidGlassButton';
import './liquid-glass.css';

interface ChatMessage {
  id: string;
  sender_type: 'USER' | 'BOT' | 'SYSTEM';
  message_text: string;
  created_at: string;
  rating_score?: number;
}

const SOL_INITIAL_MESSAGE =
  'Xin chào! Tôi là Trợ Lý AI Concierge của Söl Wellness Sanctuary (Flow 6). Tôi có thể giải đáp thắc mắc về lịch lớp, gói tập, chế độ dinh dưỡng và quy chế check-in 24/7.';

const RUNOVA_INITIAL_MESSAGE =
  'Xin chào! Tôi là Trợ Lý AI của Runova Athletic Sportverse. Tôi sẵn sàng hỗ trợ bạn kiểm tra lịch sân Tennis/Padel/Cầu lông, phân tích phong độ trận đấu và kiểm tra thẻ Court Pass 24/7.';

interface SuggestionItem {
  icon: string;
  label: string;
  prompt: string;
}

const SOL_SUGGESTIONS: SuggestionItem[] = [
  { icon: '💎', label: 'Tư vấn gói thẻ', prompt: 'Tư vấn bảng giá và các gói thẻ thành viên Söl' },
  { icon: '🧘', label: 'Lịch lớp Pilates', prompt: 'Xem lịch lớp Reformer Pilates hôm nay' },
  { icon: '📱', label: 'Mã QR Turnstile', prompt: 'Cách lấy mã QR check-in qua cổng Turnstile' },
  { icon: '🥗', label: 'Gợi ý dinh dưỡng', prompt: 'Gợi ý chế độ dinh dưỡng phục hồi sau tập' },
];

const RUNOVA_SUGGESTIONS: SuggestionItem[] = [
  { icon: '🎾', label: 'Đặt sân Tennis/Padel', prompt: 'Xem lịch sân Tennis và Padel hôm nay' },
  { icon: '⚡', label: 'Cảm biến AI đo lực', prompt: 'Cách hoạt động của hệ thống cảm biến AI đo lực và tốc độ vung vợt' },
  { icon: '🎟️', label: 'Mã Court Pass QR', prompt: 'Cách lấy mã QR Court Pass check-in qua cổng Turnstile sân' },
  { icon: '🏆', label: 'Gói thẻ thi đấu', prompt: 'Tư vấn bảng giá các gói thẻ Runova Court Pass' },
];

let msgCounter = 100;
function createMessage(sender_type: 'USER' | 'BOT', message_text: string): ChatMessage {
  msgCounter += 1;
  return {
    id: `${sender_type.toLowerCase()}-${Date.now()}-${msgCounter}`,
    sender_type,
    message_text,
    created_at: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
  };
}

export function LiquidGlassChatbot() {
  const { theme } = useTheme();
  const isRunova = theme === 'runova';

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender_type: 'BOT',
      message_text: isRunova ? RUNOVA_INITIAL_MESSAGE : SOL_INITIAL_MESSAGE,
      created_at: 'Vừa xong',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync initial message if theme changes while chat has only initial greeting
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [
          {
            id: 'msg-init',
            sender_type: 'BOT',
            message_text: isRunova ? RUNOVA_INITIAL_MESSAGE : SOL_INITIAL_MESSAGE,
            created_at: 'Vừa xong',
          },
        ];
      }
      return prev;
    });
  }, [isRunova]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg = createMessage('USER', text);

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Simulate AI generation matching theme knowledge
    setTimeout(() => {
      let replyText: string;
      const lower = text.toLowerCase();

      if (isRunova) {
        if (lower.includes('gói') || lower.includes('giá') || lower.includes('bảng giá') || lower.includes('thẻ')) {
          replyText =
            'Runova Athletic Sportverse cung cấp 3 hạng mức thẻ Court Pass:\n' +
            '✦ Club Player (1.800.000 VNĐ/tháng): Khung giờ tiêu chuẩn (6h - 17h) Cầu lông & Padel, gym thể lực.\n' +
            '✦ Championship Pro (4.900.000 VNĐ/quý): Giờ vàng 17h - 22h, cảm biến AI đo lực vung vợt, 4 buổi HLV 1-1 & Waitlist VIP.\n' +
            '✦ Tournament Master (16.500.000 VNĐ/năm): 24/7 toàn cụm sân thi đấu, AI video replay trận đấu, tủ đồ VIP & vé giải mở rộng Runova Open.\n' +
            'Lưu ý: Chỉ hội viên có subscription active mới được đặt sân và check-in!';
        } else if (lower.includes('sân') || lower.includes('tennis') || lower.includes('padel') || lower.includes('lịch') || lower.includes('cầu lông')) {
          replyText =
            'Lịch sân hôm nay tại Runova Sportverse Arena:\n' +
            '✦ Sân Tennis Arena 01: 08:00 - 10:00 (Trống) | 17:30 - 20:30 (Đã đặt)\n' +
            '✦ Sân Padel Kính Panorama 02: 07:00 - 09:00 (Trống) | 18:00 - 21:00 (Đã đặt)\n' +
            '✦ Sân Cầu Lông VIP 03: 06:00 - 22:00 (Còn 3 slot giờ vàng)\n' +
            '✦ Sân Squash Tốc Độ: Sẵn sàng phục vụ hội viên!\n' +
            'Bạn có thể vào Cổng Hội Viên để đặt sân và khóa slot trực tiếp.';
        } else if (lower.includes('qr') || lower.includes('check-in') || lower.includes('cổng') || lower.includes('cửa') || lower.includes('pass')) {
          replyText =
            'Hệ thống kiểm soát ra vào Turnstile sân đấu Runova vận hành tự động:\n' +
            '1. Đăng nhập Cổng Hội Viên -> Chọn Thẻ Court Pass & Mã QR.\n' +
            '2. Mã QR động có mã hóa xoay vòng tự động đếm ngược 60 giây để chống gian lận.\n' +
            '3. Quét mã tại mắt đọc Turnstile sảnh sân: Cổng bật tín hiệu xanh và mở chốt trong 0.2 giây nếu subscription active!';
        } else if (lower.includes('ai') || lower.includes('cảm biến') || lower.includes('đo lực') || lower.includes('vung') || lower.includes('tốc độ')) {
          replyText =
            'Hệ thống AI Sportverse Vision phân tích chuyển động sân đấu:\n' +
            '✦ Camera tốc độ cao 240fps theo dõi quỹ đạo bóng và điểm rơi trên mặt sân chuẩn xác 98%.\n' +
            '✦ Đo lực đánh, góc vung vợt (Forehand/Backhand) và tốc độ giao bóng (km/h) theo thời gian thực.\n' +
            '✦ Tự động xuất heatmap di chuyển và báo cáo phân tích phong độ sau mỗi set đấu!';
        } else {
          replyText =
            `Cảm ơn câu hỏi của bạn về "${text}". Hệ thống AI của Runova Sportverse đã ghi nhận. ` +
            'Bạn có thể đăng nhập vào Portal Hội Viên để quản lý lịch sân hoặc trao đổi trực tiếp với ban quản trị tại bàn tiếp đón sảnh trung tâm!';
        }
      } else {
        if (lower.includes('gói') || lower.includes('giá') || lower.includes('bảng giá')) {
          replyText =
            'Söl Sanctuary cung cấp 3 hạng mức thẻ thành viên:\n' +
            '✦ The Essential (2.800.000 VNĐ/tháng): Phòng tạ Olympic, bể thủy trị liệu & 2 lớp nhóm/tuần.\n' +
            '✦ The Sanctuary (7.500.000 VNĐ/quý): Không giới hạn Reformer Pilates, Boxing, 4 buổi HLV cá nhân & AI InBody.\n' +
            '✦ The Sovereign (26.000.000 VNĐ/năm): Đặc quyền VIP 24/7, phòng thay đồ riêng, HLV dinh dưỡng riêng & Cryotherapy.\n' +
            'Lưu ý: Chỉ hội viên có subscription active mới được đặt chỗ và check-in!';
        } else if (lower.includes('lớp') || lower.includes('reformer') || lower.includes('pilates') || lower.includes('lịch')) {
          replyText =
            'Lịch lớp hôm nay tại Söl Sanctuary:\n' +
            '✦ 07:00 – Reformer Alignment & Core (Studio Aurora) • HLV Elena Vũ\n' +
            '✦ 09:30 – Olympic Kinetic Lifting (Strength Sanctuary) • HLV Master Khoa\n' +
            '✦ 17:30 – Technical Boxing Combatives (Combat Ring)\n' +
            '✦ 19:00 – Restorative Sound Bath & Sauna (Hydro Sanctuary)\n' +
            'Bạn có thể vào Cổng Hội Viên để đặt chỗ giữ slot tức thì!';
        } else if (lower.includes('qr') || lower.includes('check-in') || lower.includes('cổng') || lower.includes('cửa')) {
          replyText =
            'Hệ thống kiểm soát ra vào Turnstile của Söl vận hành tự động:\n' +
            '1. Mở Cổng Hội Viên (Member Portal) -> Chọn Thẻ QR Ra Vào.\n' +
            '2. Mã QR động có mã hóa xoay vòng tự động đếm ngược 60 giây để chống gian lận.\n' +
            '3. Quét mã tại mắt đọc Turnstile sảnh: Cổng bật xanh và mở chốt trong 0.2 giây nếu subscription active!';
        } else if (lower.includes('dinh dưỡng') || lower.includes('ăn') || lower.includes('calo') || lower.includes('thực đơn')) {
          replyText =
            'Khuyến nghị dinh dưỡng phục hồi theo thể trạng AI Biometric:\n' +
            '✦ Sau buổi tập tạ: Bổ sung 25-30g đạm hấp thu nhanh (Whey Isolate/Ức gà) kết hợp carb phức hợp (khoai lang, yến mạch).\n' +
            '✦ Sau lớp Reformer/Cardio: Bù điện giải (nước dừa tươi hoặc muối khoáng) và uống tối thiểu 500ml nước trong 30 phút đầu.\n' +
            'HLV của bạn có thể xuất thực đơn chi tiết tại Cổng Huấn Luyện Viên!';
        } else {
          replyText =
            `Cảm ơn câu hỏi của bạn về "${text}". Hệ thống AI Concierge của Söl đã ghi nhận. ` +
            'Đối với các yêu cầu can thiệp sâu về thể trạng hoặc kiểm tra gói thẻ cụ thể, bạn có thể đăng nhập vào Portal Hội Viên hoặc gặp trực tiếp Lễ Tân tại sảnh chính!';
        }
      }

      const botMsg = createMessage('BOT', replyText);

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleRateMessage = (msgId: string, rating: number) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, rating_score: rating } : m))
    );
  };

  return (
    <>
      {/* Floating Liquid Glass Trigger Bubble */}
      <div className="liquid-glass-chat-trigger" title="Mở Trợ Lý AI Chatbot">
        <LiquidGlassButton
          shape="circle"
          size={18}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '62px',
            height: '62px',
            boxShadow: isRunova
              ? '0 12px 35px rgba(0, 0, 0, 0.4), 0 0 20px rgba(212, 233, 92, 0.4)'
              : '0 12px 35px rgba(0, 0, 0, 0.4), 0 0 20px rgba(194, 166, 132, 0.35)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>{isRunova ? '⚡' : '✦'}</span>
            <span
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.1em',
                fontWeight: 700,
                marginTop: '2px',
                color: isRunova ? '#D4E95C' : undefined,
              }}
            >
              AI
            </span>
          </div>
        </LiquidGlassButton>

        {/* Pulsing online beacon */}
        <span
          className="liquid-glass-beacon"
          style={{ backgroundColor: isRunova ? '#D4E95C' : undefined }}
        />
      </div>

      {/* Expandable Liquid Glass Chatbot Window */}
      {isOpen && (
        <div
          className="liquid-glass-chat-window"
          aria-label={isRunova ? 'Runova AI Chatbot Window' : 'Söl AI Chatbot Window'}
        >
          <LiquidGlassContainer
            shape="rounded"
            borderRadius={22}
            tintOpacity={0.28}
            className="liquid-glass-chat-container"
          >
            {/* Header */}
            <div className="liquid-glass-chat-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  className="liquid-glass-avatar"
                  style={{
                    backgroundColor: isRunova ? 'rgba(212, 233, 92, 0.2)' : undefined,
                    color: isRunova ? '#D4E95C' : undefined,
                  }}
                >
                  {isRunova ? '⚡' : '✦'}
                </div>
                <div>
                  <div
                    className="liquid-glass-bot-name"
                    style={{
                      fontFamily: isRunova ? 'var(--font-heading)' : undefined,
                      letterSpacing: isRunova ? '0.08em' : undefined,
                    }}
                  >
                    {isRunova ? 'RUNOVA SPORTVERSE AI' : 'SÖL AI CONCIERGE'}
                  </div>
                  <div className="liquid-glass-bot-status">
                    <span
                      className="online-dot"
                      style={{ backgroundColor: isRunova ? '#D4E95C' : undefined }}
                    />{' '}
                    Trực tuyến 24/7 • {isRunova ? 'Sportverse AI Core' : 'Flow 6'}
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="liquid-glass-close-btn"
                onClick={() => setIsOpen(false)}
                title="Đóng cửa sổ chat"
              >
                ✕
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="liquid-glass-chat-body">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chat-bubble-row ${msg.sender_type === 'USER' ? 'user-row' : 'bot-row'}`}
                >
                  <div className={`chat-bubble ${msg.sender_type === 'USER' ? 'user-bubble' : 'bot-bubble'}`}>
                    <div className="chat-bubble-text" style={{ whiteSpace: 'pre-line' }}>
                      {msg.message_text}
                    </div>

                    <div className="chat-bubble-meta">
                      <span>{msg.created_at}</span>

                      {/* 1-5 Stars Rating for BOT messages (matching schema rating_score) */}
                      {msg.sender_type === 'BOT' && (
                        <div className="chat-rating-stars">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => handleRateMessage(msg.id, star)}
                              className={`star-btn ${msg.rating_score && msg.rating_score >= star ? 'active' : ''}`}
                              title={`Đánh giá ${star} sao`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="chat-bubble-row bot-row">
                  <div className="chat-bubble bot-bubble typing-bubble">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            <div className="liquid-glass-suggestions">
              {(isRunova ? RUNOVA_SUGGESTIONS : SOL_SUGGESTIONS).map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="suggestion-chip"
                  onClick={() => handleSend(item.prompt)}
                  style={{
                    borderColor: isRunova ? 'rgba(212, 233, 92, 0.3)' : undefined,
                    color: isRunova ? '#FFFFFF' : undefined,
                  }}
                >
                  <span className="chip-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              className="liquid-glass-chat-input-bar"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                type="text"
                className="liquid-glass-input"
                placeholder={
                  isRunova
                    ? 'Hỏi AI về lịch sân Tennis, Padel, cảm biến đo lực, gói thẻ...'
                    : 'Hỏi AI về lịch lớp, gói tập, dinh dưỡng...'
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="liquid-glass-send-btn"
                disabled={!inputValue.trim()}
                title="Gửi tin nhắn"
                style={{
                  backgroundColor: isRunova ? '#D4E95C' : undefined,
                  color: isRunova ? '#16382C' : undefined,
                }}
              >
                →
              </button>
            </form>
          </LiquidGlassContainer>
        </div>
      )}
    </>
  );
}

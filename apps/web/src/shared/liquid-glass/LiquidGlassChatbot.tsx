import React, { useState, useRef, useEffect } from 'react';
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

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender_type: 'BOT',
    message_text:
      'Xin chào! Tôi là Trợ Lý AI Concierge của Söl Wellness Sanctuary (Flow 6). Tôi có thể giải đáp thắc mắc về lịch lớp, gói tập, chế độ dinh dưỡng và quy chế check-in 24/7.',
    created_at: 'Vừa xong',
  },
];

const SUGGESTIONS = [
  '💎 Tư vấn gói thẻ phù hợp',
  '🧘 Lịch lớp Reformer Pilates hôm nay',
  '📱 Cách lấy mã QR check-in qua cổng',
  '🥗 Gợi ý dinh dưỡng sau tập',
];

let msgCounter = 100;
function createMessage(sender_type: 'USER' | 'BOT', message_text: string): ChatMessage {
  msgCounter += 1;
  return {
    id: `${sender_type.toLowerCase()}-${msgCounter}`,
    sender_type,
    message_text,
    created_at: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
  };
}

export function LiquidGlassChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

    // Simulate AI generation matching Söl Sanctuary knowledge
    setTimeout(() => {
      let replyText: string;
      const lower = text.toLowerCase();

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
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.4), 0 0 20px rgba(194, 166, 132, 0.35)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.4rem', lineHeight: 1 }}>✦</span>
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.1em', fontWeight: 700, marginTop: '2px' }}>
              AI
            </span>
          </div>
        </LiquidGlassButton>

        {/* Pulsing online beacon */}
        <span className="liquid-glass-beacon" />
      </div>

      {/* Expandable Liquid Glass Chatbot Window */}
      {isOpen && (
        <div className="liquid-glass-chat-window" aria-label="Söl AI Chatbot Window">
          <LiquidGlassContainer
            shape="rounded"
            borderRadius={22}
            tintOpacity={0.28}
            className="liquid-glass-chat-container"
          >
            {/* Header */}
            <div className="liquid-glass-chat-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="liquid-glass-avatar">✦</div>
                <div>
                  <div className="liquid-glass-bot-name">SÖL AI CONCIERGE</div>
                  <div className="liquid-glass-bot-status">
                    <span className="online-dot" /> Trực tuyến 24/7 • Flow 6
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
              {SUGGESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="suggestion-chip"
                  onClick={() => handleSend(item.replace(/^[^\s]+\s/, ''))}
                >
                  {item}
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
                placeholder="Hỏi AI về lịch lớp, gói tập, dinh dưỡng..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="liquid-glass-send-btn"
                disabled={!inputValue.trim()}
                title="Gửi tin nhắn"
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

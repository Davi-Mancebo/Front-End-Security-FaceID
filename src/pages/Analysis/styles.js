import styled from "styled-components";

export const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  padding: 80px 20px 18px 20px;
  display: flex;
  align-items: center;
  color: white;
  font-size: 18px;
  cursor: pointer;
`;

export const Content = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 50px 50px 0 0;
  padding: 25px;
  overflow-y: auto;
`;

export const Item = styled.div`
  margin-bottom: 18px;
  border-bottom: 1px solid #eee;
  padding-bottom: 12px;

  &:last-child {
    border-bottom: none;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
`;

export const Thumb = styled.div`
  width: 53px;
  height: 53px;
  background: #d9d9d9;
  border-radius: 10px;
  margin-right: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Ellipse = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e3e3eb;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Info = styled.div`
  flex: 1;
`;

export const Title = styled.div`
  font-size: 15px;
  color: rgba(0,0,0,0.7);
`;

export const Status = styled.span`
  display: inline-block;
  margin-left: 8px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  background: ${(p) => (p.error ? "#ff4444" : "#00c853")};
`;

export const Device = styled.div`
  font-size: 13px;
  color: #999;
  margin-top: 2px;
`;

export const ExpandedArea = styled.div`
  margin-top: 12px;
  background: #f5f5f5;
  border-radius: 12px;
  padding: 10px;
`;

export const Photo = styled.img`
  width: 100%;
  border-radius: 12px;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  color: #777;
  margin-top: 40px;
  font-size: 18px;

  @keyframes blink {
    0%, 20% { opacity: 0; }
    40% { opacity: 1; }
    100% { opacity: 1; }
  }

  span:nth-child(1) {
    animation: blink 1.4s infinite;
  }

  span:nth-child(2) {
    animation: blink 1.4s infinite 0.2s;
  }

  span:nth-child(3) {
    animation: blink 1.4s infinite 0.4s;
  }
`;

export const BackButton = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 12px 0;
  background: #484C7B;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
`;

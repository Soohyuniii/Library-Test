import ReactDOM from "react-dom/client"; // React 18부터는 createRoot API를 사용
import App from "./App"; // React 컴포넌트인 App을 import
// `declare global`을 사용하여 `window` 객체의 타입을 확장
declare global {
  interface Window {
    MyWidget: {
      mount: (el: HTMLElement) => void;
      unmount: (el: HTMLElement) => void;
    };
  }
}
// mount 함수: 컴포넌트를 지정된 DOM 요소에 마운트
function mount(el: HTMLElement) {
  const root = ReactDOM.createRoot(el); // DOM 엘리먼트에 React 렌더링을 위한 root 생성
  root.render(<App />); // App 컴포넌트를 해당 root에 렌더링
}

// unmount 함수: 지정된 DOM 요소에서 컴포넌트를 언마운트
function unmount(el: HTMLElement) {
  ReactDOM.createRoot(el).unmount(); // 해당 DOM에서 렌더링된 React 컴포넌트를 제거
}

// window 객체에 MyWidget 이름으로 mount와 unmount 함수 할당
if (typeof window !== "undefined") {
  window.MyWidget = { mount, unmount };
}

// 외부에서 사용하려면 mount와 unmount를 export
export { mount, unmount };

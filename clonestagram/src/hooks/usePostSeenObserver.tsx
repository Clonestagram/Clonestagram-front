import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

type SeenCallback = (postId: number) => void;

export const usePostSeenObserver = (postId: number, onSeen: SeenCallback) => {
  const { ref, inView } = useInView({ threshold: 0.1 });

  const hasSeenRef = useRef(false);                // ✅ 이미 seen 처리했는지
  const hasStayedLongEnoughRef = useRef(false);    // ✅ 0.5초 이상 보여졌는지
  const stayTimerRef = useRef<number | null>(null); // ✅ 0.5초 타이머
  const exitTimerRef = useRef<number | null>(null); // ✅ 3초 타이머

  useEffect(() => {
    if (inView) {
      // 화면에 들어옴 → 0.5초 이상 머물렀는지 체크
      if (!hasStayedLongEnoughRef.current) {
        stayTimerRef.current = window.setTimeout(() => {
          hasStayedLongEnoughRef.current = true;
          console.log(`[Seen Logic] Post ${postId} stayed 0.5s and is now eligible for seen`);
        }, 500); // 0.5초
      }

      // 나가려다 다시 들어온 경우 → 3초 타이머 취소
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }
    } else {
      // 화면에서 나감 + 조건 충족 → 3초 뒤 seen 처리
      if (hasStayedLongEnoughRef.current && !hasSeenRef.current) {
        exitTimerRef.current = window.setTimeout(() => {
          hasSeenRef.current = true;
          console.log(`[Seen] Post ${postId} marked as seen after exit`);
          onSeen(postId);
        }, 1500); // 3초 후 seen
      }

      // 화면에서 안 보이기 시작 → 보여진 적 없는 상태면 타이머 취소
      if (!hasStayedLongEnoughRef.current && stayTimerRef.current) {
        clearTimeout(stayTimerRef.current);
        stayTimerRef.current = null;
      }
    }

    return () => {
      if (stayTimerRef.current) clearTimeout(stayTimerRef.current);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, [inView]);

  return ref;
};

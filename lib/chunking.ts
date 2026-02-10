import { Step } from "@/lib/types";

export function createThreeSteps(taskText: string): Step[] {
  const mission = taskText.trim() || "오늘 할 일";

  return [
    {
      title: `1단계 지금 바로 "${mission}" 작업 화면 열기!`,
      durationSec: 10,
    },
    {
      title: "2단계 가장 작은 첫 행동 1개 바로 실행하기!",
      durationSec: 20,
    },
    {
      title: "3단계 20초 집중해서 눈에 보이는 결과 남기기!",
      durationSec: 20,
    },
  ];
}

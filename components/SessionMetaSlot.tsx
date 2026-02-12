type SessionMetaSlotProps = {
  className?: string;
};

export function SessionMetaSlot({ className = "" }: SessionMetaSlotProps) {
  return (
    <p
      className={`text-xs font-medium leading-[18px] tracking-wide text-zinc-500 ${className}`}
      aria-label="session meta slot"
    >
      Session: —
    </p>
  );
}

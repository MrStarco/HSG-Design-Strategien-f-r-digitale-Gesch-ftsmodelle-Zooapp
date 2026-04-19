import { memo } from "react";

type Props = {
  label: string;
  onSelect: (label: string) => void;
};

export const ChatChip = memo(function ChatChip({ label, onSelect }: Props) {
  return (
    <button type="button" onClick={() => onSelect(label)}>
      {label}
    </button>
  );
});

type Props = {
  children: React.ReactNode;
};

export function TabContent({ children }: Props) {
  return <div className="w-full shrink-0 h-full touch-pan-y">{children}</div>;
}

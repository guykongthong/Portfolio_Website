interface TagProps {
  children: React.ReactNode;
}

export const Tag = ({ children }: TagProps) => (
  <span className="text-xs rounded-full border px-3 py-1 leading-6 mr-2 mb-2 inline-block">
    {children}
  </span>
);
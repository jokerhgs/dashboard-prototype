import React from "react";

interface HeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  description,
  className = "",
}) => (
  <header className={`mb-8 ${className}`}>
    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
    {description && <p className="mt-1 text-gray-600">{description}</p>}
  </header>
);

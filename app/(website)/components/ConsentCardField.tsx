type ConsentCardFieldProps = {
  checked: boolean;
  description: string;
  error?: string;
  id: string;
  label: string;
  onCheckedChange: (checked: boolean) => void;
  required?: boolean;
};

export default function ConsentCardField({
  checked,
  description,
  error,
  id,
  label,
  onCheckedChange,
  required = false,
}: ConsentCardFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className={`flex cursor-pointer rounded-2xl border px-4 py-4 transition focus-within:ring-2 focus-within:ring-[rgba(0,87,191,0.18)] ${
          checked
            ? "border-[rgba(0,87,191,0.35)] bg-[rgba(0,87,191,0.06)]"
            : "border-[var(--color-line)] bg-white/72"
        }`}
      >
        <span className="flex items-start gap-3">
          <input
            checked={checked}
            className="mt-1 h-4 w-4 rounded border-[var(--color-line-strong)] text-[var(--color-brand)] focus:ring-[rgba(0,87,191,0.18)]"
            id={id}
            onChange={(event) => onCheckedChange(event.target.checked)}
            type="checkbox"
          />
          <span className="space-y-1">
            <span className="block text-sm font-medium text-[var(--color-text)]">
              {label}
              {required ? " *" : ""}
            </span>
            <span className="block text-sm leading-6 text-[var(--color-text-soft)]">{description}</span>
          </span>
        </span>
      </label>
      {error ? <p className="text-sm text-[var(--color-error)]">{error}</p> : null}
    </div>
  );
}

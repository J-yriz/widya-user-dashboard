import { useEffect, useRef } from 'react';
import { useOverlay } from '../../hooks/useOverlay';
import type { User } from '../../types/user';
import { CornerBrackets } from '../ui/Blueprint';
import {
  IconBuilding,
  IconGlobe,
  IconMail,
  IconPhone,
  IconPin,
} from '../ui/Icons';

interface UserModalProps {
  readonly user: User;
  readonly onClose: () => void;
}

function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0] ?? '')
    .join('')
    .toUpperCase();
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 shrink-0 text-muted">{icon}</span>
      <div className="min-w-0">
        <dt className="text-micro font-medium tracking-[0.2em] text-muted uppercase">{label}</dt>
        <dd className="mt-1 text-sm leading-6 break-words text-ink-900">{children}</dd>
      </div>
    </div>
  );
}

export function UserModal({ user, onClose }: UserModalProps) {
  const dialogRef = useOverlay(true, onClose);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Close when the pointer press starts on the backdrop itself.
  useEffect(() => {
    const node = backdropRef.current;
    if (!node) return;

    const onPointerDown = (event: PointerEvent) => {
      if (event.target === node) onClose();
    };

    node.addEventListener('pointerdown', onPointerDown);
    return () => node.removeEventListener('pointerdown', onPointerDown);
  }, [onClose]);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink-900/55 p-4 backdrop-blur-xl sm:items-center sm:p-8"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-modal-title"
        tabIndex={-1}
        className="animate-rise relative my-auto w-full max-w-3xl border border-hairline bg-surface shadow-panel focus:outline-none"
      >
        <CornerBrackets />

        {/* ── Header ─────────────────────────────────────────── */}
        <header className="flex items-start gap-4 border-b border-hairline p-6 sm:p-8">
          <span className="grid size-14 shrink-0 place-items-center border border-marker bg-ink-900 text-lg font-medium tracking-wide text-surface">
            {initials(user.name)}
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-label font-medium tracking-[0.24em] text-muted uppercase">
              Spesimen #{String(user.id).padStart(3, '0')}
            </p>
            <h2 id="user-modal-title" className="mt-2 text-h3 font-medium tracking-tight text-ink-900">
              {user.name}
            </h2>
            <p className="mt-1 text-sm text-muted">@{user.username}</p>
          </div>
        </header>

        {/* ── Body ───────────────────────────────────────────── */}
        <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-2">
          <section aria-labelledby="modal-contact">
            <h3
              id="modal-contact"
              className="text-micro font-medium tracking-[0.2em] text-muted uppercase"
            >
              Kontak
            </h3>
            <dl className="mt-4 space-y-4">
              <Field icon={<IconMail size={15} />} label="Email">
                <a
                  href={`mailto:${user.email}`}
                  className="underline decoration-marker underline-offset-4 transition-colors duration-(--dur-fast) hover:text-ink-500 hover:decoration-ink-500"
                >
                  {user.email}
                </a>
              </Field>
              <Field icon={<IconPhone size={15} />} label="Telepon">
                <a
                  href={`tel:${user.phone.split(' ')[0]}`}
                  className="underline decoration-marker underline-offset-4 transition-colors duration-(--dur-fast) hover:text-ink-500 hover:decoration-ink-500"
                >
                  {user.phone}
                </a>
              </Field>
              <Field icon={<IconGlobe size={15} />} label="Website">
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline decoration-marker underline-offset-4 transition-colors duration-(--dur-fast) hover:text-ink-500 hover:decoration-ink-500"
                >
                  {user.website}
                </a>
              </Field>
            </dl>
          </section>

          <section aria-labelledby="modal-address">
            <h3
              id="modal-address"
              className="text-micro font-medium tracking-[0.2em] text-muted uppercase"
            >
              Alamat
            </h3>
            <dl className="mt-4 space-y-4">
              <Field icon={<IconPin size={15} />} label="Lokasi">
                <address className="not-italic">
                  {user.address.street}, {user.address.suite}
                  <br />
                  {user.address.city} {user.address.zipcode}
                </address>
              </Field>
              <Field icon={<IconGlobe size={15} />} label="Koordinat">
                <span className="tabular-nums">
                  {user.address.geo.lat}, {user.address.geo.lng}
                </span>
              </Field>
            </dl>
          </section>

          <section aria-labelledby="modal-company" className="md:col-span-2">
            <h3
              id="modal-company"
              className="text-micro font-medium tracking-[0.2em] text-muted uppercase"
            >
              Perusahaan
            </h3>
            <dl className="mt-4 space-y-4">
              <Field icon={<IconBuilding size={15} />} label="Nama">
                {user.company.name}
              </Field>
              <Field icon={<IconBuilding size={15} />} label="Catch phrase">
                <em className="not-italic text-muted">“{user.company.catchPhrase}”</em>
              </Field>
              <Field icon={<IconBuilding size={15} />} label="Bidang (bs)">
                <span className="inline-flex border border-hairline bg-ink-700/[0.04] px-2 py-1 text-xs text-muted">
                  {user.company.bs}
                </span>
              </Field>
            </dl>
          </section>
        </div>

        {/* ── Footer ─────────────────────────────────────────── */}
        <footer className="flex flex-col-reverse items-stretch gap-3 border-t border-hairline p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="text-xs text-muted">
            Tekan <kbd className="border border-hairline px-1.5 py-0.5 font-sans">Esc</kbd> untuk
            menutup
          </p>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 bg-ink-900 px-5 py-2.5 text-sm font-medium text-surface transition-transform duration-(--dur-fast) hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orchid"
          >
            Tutup
          </button>
        </footer>
      </div>
    </div>
  );
}

import styled from '@emotion/styled';
import data from 'data.json';
import RoundButton from '@/components/RoundButton.tsx';
import { Paragraph } from '@/components/Text.tsx';

const Invitation = () => {
  const { greeting } = data;

  const handleAddToAppleCalendar = () => {
    const title = greeting?.title || 'Omakase Night';
    const description = (greeting?.message || '').replace(/\n/g, '\\n');
    const location = 'Omakase Night'; // 🔑 fixed text

    // --- parse event date/time from greeting.eventDetail ---
    const start = parseEventDateTime(greeting?.eventDetail);
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // default +2h

    const tzid = 'Europe/London';
    const dtStart = toICSLocal(start);
    const dtEnd = toICSLocal(end);

    const uid = `${Date.now()}@omakase.invite`;
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Omakase Night//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTART;TZID=${tzid}:${dtStart}`,
      `DTEND;TZID=${tzid}:${dtEnd}`,
      `SUMMARY:${escapeICS(title)}`,
      `LOCATION:${escapeICS(location)}`,
      description ? `DESCRIPTION:${escapeICS(description)}` : '',
      'END:VEVENT',
      'END:VCALENDAR',
    ].filter(Boolean);

    const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'omakase-night.ics';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <InvitationWrapper>
      <Paragraph>{greeting.message}</Paragraph>
      <RoundButton as="button" onClick={handleAddToAppleCalendar}>
        Add to Apple Calendar
      </RoundButton>
    </InvitationWrapper>
  );
};

export default Invitation;

const InvitationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

/* ---------- helpers ---------- */
function parseEventDateTime(input?: string): Date {
  if (!input) return new Date();
  const firstLine = input.split('\n').find(Boolean) || input;
  const cleaned = firstLine.replace(/[·•|–—-]/g, ' ').replace(/\s+/g, ' ').trim();
  const d = new Date(cleaned);
  if (!isNaN(d.getTime())) return d;

  // fallback: try dd Month yyyy and hh:mm
  const m = cleaned.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4}).*?(\d{1,2}:\d{2})\s*(AM|PM)?/i);
  if (m) {
    const [, day, monStr, year, hm, ampm] = m;
    const month = new Date(`${monStr} 1, 2000`).getMonth();
    let [h, min] = hm.split(':').map(Number);
    if (ampm && ampm.toUpperCase() === 'PM' && h < 12) h += 12;
    if (ampm && ampm.toUpperCase() === 'AM' && h === 12) h = 0;
    return new Date(Number(year), month, Number(day), h, min, 0);
  }
  return new Date();
}

function toICSLocal(d: Date) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    d.getFullYear().toString() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    'T' +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    pad(d.getSeconds())
  );
}

function escapeICS(s: string) {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}
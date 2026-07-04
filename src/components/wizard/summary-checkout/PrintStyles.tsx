export default function PrintStyles() {
  return (
    <style>{`
      @media print {
        header, button, .no-print { display: none !important; }
        body { background: white; color: black; }
        .print-card { border: none !important; shadow: none !important; }
      }
    `}</style>
  );
}

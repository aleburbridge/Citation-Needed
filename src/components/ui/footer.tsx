export default function Footer() {
  return (
  <footer className="fixed bottom-2 w-full px-4 py-2 text-center text-muted-foreground custom-font">
    A game by{" "}
    <a href="https://github.com/aleburbridge" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
      Alexander Bridgeman
    </a> | Future article suggestions?{" "}
    <button
      onClick={() => {
        navigator.clipboard.writeText("aleburbridge@gmail.com");
        alert("Email copied to clipboard");
      }}
      className="font-medium text-primary hover:underline"
    >
      Send me an email
    </button>
  </footer>
)};

export { Footer };
export default function assert(condition, message) {
  if (isProduction()) {
    return;
  }

  if (!condition) {
    let defaultMessage = message ?? "assertion not pass";
    throw new Error(defaultMessage);
  }
}

function isProduction() {
  return process.env.NODE_ENV === "production";
}

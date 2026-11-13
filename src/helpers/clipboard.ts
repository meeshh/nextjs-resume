import toast from 'react-hot-toast';

export async function copyToClipboard(text: string, successMessage?: string) {
  try {
    await navigator.clipboard.writeText(text);
    if (successMessage) toast.success(successMessage);
  } catch {
    toast.error('Error copying to clipboard');
  }
}

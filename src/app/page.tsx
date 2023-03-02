import { redirect } from 'next/navigation';
export default async function Home() {
  // Check if user is looged in
  redirect('/home');
}
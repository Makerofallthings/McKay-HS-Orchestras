'use client';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {useSiteContent} from '@/components/orchestra/SiteContent';
export default function Page(){const router=useRouter();const {openLogin}=useSiteContent();useEffect(()=>{openLogin();router.replace('/')},[]);return null}

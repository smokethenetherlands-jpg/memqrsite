'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight, QrCode, ShieldCheck, Sparkles,
  PhoneCall, Mail, MapPin, BadgeCheck, HeartHandshake
} from 'lucide-react'

const SITE_DOMAIN = 'memqr.ru'

// Твои фотографии (signed URL — истекут со временем)
const PHOTOS = [
  "https://eezvkzgssllsvzuklnhv.supabase.co/storage/v1/object/public/memqr%20photo/065cfebaedb06404f183b22ab5dbff96.jpg",
  "https://eezvkzgssllsvzuklnhv.supabase.co/storage/v1/object/public/memqr%20photo/5db8a1a909faa39eae7f3d7252b67e52.jpg",
  "https://eezvkzgssllsvzuklnhv.supabase.co/storage/v1/object/public/memqr%20photo/8a9ac8a619396f3500fe389d9694432a.jpg",
  "https://eezvkzgssllsvzuklnhv.supabase.co/storage/v1/object/public/memqr%20photo/bfd53420bcebecb1c0e5ecf5c1b4b5ce.jpg",
]

// — декоративные фоны (мягкие орбы)
const Orbs = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
    <motion.div initial={{opacity:0}} animate={{opacity:0.6}} transition={{duration:2}}
      className="absolute -top-40 -left-40 h-96 w-96 rounded-full blur-3xl"
      style={{background:'radial-gradient(closest-side,#82a0a8 0%,transparent 70%)'}} />
    <motion.div initial={{opacity:0}} animate={{opacity:0.5,y:[0,-20,0],x:[0,10,0]}} transition={{repeat:Infinity,duration:10}}
      className="absolute top-40 right-10 h-80 w-80 rounded-full blur-3xl"
      style={{background:'radial-gradient(closest-side,#a9b8bf 0%,transparent 70%)'}} />
    <motion.div initial={{opacity:0}} animate={{opacity:0.4,y:[0,15,0]}} transition={{repeat:Infinity,duration:12}}
      className="absolute bottom-10 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl"
      style={{background:'radial-gradient(closest-side,#d4c2b0 0%,transparent 70%)'}} />
  </div>
)

// «свеча»
const Candle = () => (
  <div className="relative h-28 w-10 mx-auto">
    <div className="absolute inset-x-0 bottom-0 h-20 rounded-md bg-neutral-200/70 shadow-inner" />
    <motion.div className="absolute left-1/2 top-0 h-8 w-4 -translate-x-1/2 rounded-b-full"
      animate={{scale:[1,1.05,1],y:[0,-2,0],filter:['blur(1px)','blur(2px)','blur(1px)']}}
      transition={{repeat:Infinity,duration:2}}
      style={{background:'radial-gradient(ellipse at center, rgba(255,200,120,.9) 0%, rgba(255,150,80,.7) 40%, rgba(255,120,60,.3) 70%, transparent 80%)'}}
    />
    <div className="absolute -inset-2 rounded-xl bg-amber-100/20 blur-xl" />
  </div>
)

const Divider = () => (
  <div className="mx-auto my-10 h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-neutral-300/60 to-transparent" />
)

const Badge = ({children}:{children:React.ReactNode}) => (
  <span className="inline-flex items-center gap-1 rounded-full border border-neutral-300/60 bg-white/60 px-3 py-1 text-xs text-neutral-700 shadow-sm backdrop-blur">
    <Sparkles className="h-3 w-3"/>{children}
  </span>
)

const Step = ({n,title,text}:{n:number,title:string,text:string}) => (
  <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
    transition={{duration:.5,delay:n*.05}}
    className="group rounded-2xl border border-neutral-200/70 bg-white/70 p-6 shadow-sm backdrop-blur hover:shadow-md">
    <div className="mb-3 flex items-center gap-3">
      <div className="grid h-8 w-8 place-items-center rounded-full bg-neutral-900 text-white font-semibold">{n}</div>
      <h4 className="text-lg font-semibold">{title}</h4>
    </div>
    <p className="text-sm text-neutral-600">{text}</p>
  </motion.div>
)

const PhotoCard = ({src,i}:{src:string,i:number}) => (
  <motion.div initial={{opacity:0,scale:.95}} whileInView={{opacity:1,scale:1}} viewport={{once:true}}
    transition={{duration:.4,delay:i*.05}}
    className="group relative overflow-hidden rounded-3xl border border-neutral-200/70 bg-white/60 shadow-sm backdrop-blur">
    <img src={src} alt="Работа QR Memory" className="h-64 w-full object-cover"/>
    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100"/>
    <motion.div initial={{y:20,opacity:0}} whileHover={{y:0,opacity:1}}
      className="absolute bottom-0 left-0 right-0 p-4 text-white">
      <p className="text-sm opacity-90">Пример установки таблички с QR-кодом</p>
    </motion.div>
  </motion.div>
)

const FloatingQR = () => (
  <motion.div initial={{opacity:0,y:20,rotate:-6}}
    animate={{opacity:1,y:[20,10,20],rotate:[-6,-8,-6]}}
    transition={{repeat:Infinity,duration:6}}
    className="relative mx-auto w-40 rounded-xl border bg-white p-3 shadow-xl">
    <div className="relative">
      <QrCode className="h-32 w-32 mx-auto"/>
      <motion.div className="absolute -inset-2 rounded-2xl"
        animate={{boxShadow:["0 0 0 0 rgba(0,0,0,0)","0 8px 40px 0 rgba(0,0,0,.12)","0 0 0 0 rgba(0,0,0,0)"]}}
        transition={{repeat:Infinity,duration:5}}
      />
    </div>
    <p className="mt-2 text-center text-xs text-neutral-500">Сканируйте — память оживает онлайн</p>
  </motion.div>
)

export default function Page() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress,[0,1],[0,-120])

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f7f5,transparent_20%),linear-gradient(0deg,#f7f7f5,transparent_20%)] relative text-neutral-900">
      <Orbs/>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur border-b border-neutral-200/60 bg-white/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <motion.div whileHover={{rotate:-8}} className="grid h-9 w-9 place-items-center rounded-xl bg-neutral-900 text-white">
              <QrCode className="h-5 w-5"/>
            </motion.div>
            <div>
              <div className="text-sm font-semibold tracking-wide">QR Memory</div>
              <a href={`https://${SITE_DOMAIN}`} className="text-xs text-neutral-500 hover:underline" target="_blank" rel="noreferrer">{SITE_DOMAIN}</a>
            </div>
          </div>
          <nav className="hidden gap-6 text-sm md:flex">
            <a href="#about" className="hover:opacity-70">О проекте</a>
            <a href="#how" className="hover:opacity-70">Как это работает</a>
            <a href="#portfolio" className="hover:opacity-70">Примеры</a>
            <a href="#contact" className="hover:opacity-70">Контакты</a>
            <a href="/login" className="hover:opacity-70">Вход</a>
          </nav>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-3 py-2 text-sm text-white shadow hover:shadow-md">
            Заказать <ArrowRight className="h-4 w-4"/>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <motion.div style={{y}} className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,#d2ddd9_0%,transparent_40%),radial-gradient(circle_at_80%_20%,#f1e5d2_0%,transparent_35%)]"/>
        </motion.div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2">
          <div>
            <Badge>QR-коды памяти на {SITE_DOMAIN}</Badge>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
              Один скан — живая память.
            </h1>
            <p className="mt-4 text-neutral-600">
              Я создаю аккуратные таблички с QR-кодами, которые ведут на достойно оформленную страницу памяти на {SITE_DOMAIN}. На странице — биография, фото, видео, важные даты и тёплые воспоминания.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#portfolio" className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm shadow-sm hover:shadow-md">
                Посмотреть примеры <BadgeCheck className="h-4 w-4"/>
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white shadow hover:shadow-md">
                Оставить заявку <ArrowRight className="h-4 w-4"/>
              </a>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 text-center text-xs text-neutral-600">
              <div className="rounded-xl border bg-white/70 p-3 backdrop-blur">
                <ShieldCheck className="mx-auto h-5 w-5"/> Долговечные материалы
              </div>
              <div className="rounded-xl border bg-white/70 p-3 backdrop-blur">
                <HeartHandshake className="mx-auto h-5 w-5"/> Индивидуальный подход
              </div>
              <div className="rounded-xl border bg-white/70 p-3 backdrop-blur">
                <Sparkles className="mx-auto h-5 w-5"/> Утончённый дизайн
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="mx-auto max-w-sm">
              <FloatingQR/>
              <div className="mt-6"><Candle/></div>
            </div>
          </div>
        </div>
      </section>

      <Divider/>

      {/* About */}
      <section id="about" className="relative mx-auto max-w-6xl px-4 py-12">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">О проекте QR Memory</h2>
            <p className="mt-3 text-neutral-700">
              QR Memory — это современный и бережный способ объединить офлайн-память на памятнике с живой цифровой историей. QR-код ведёт на персональную страницу памяти на {SITE_DOMAIN}, где семья и друзья могут делиться фотографиями, историями и словами поддержки.
            </p>
            <ul className="mt-5 space-y-2 text-neutral-700">
              <li className="flex gap-2"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-neutral-900"/> Эстетичные таблички под вашу стилистику памятника</li>
              <li className="flex gap-2"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-neutral-900"/> Личный кабинет: вы сами редактируете страницу памяти</li>
              <li className="flex gap-2"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-neutral-900"/> Надёжный редирект и контроль ссылки на вашей стороне</li>
              <li className="flex gap-2"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-neutral-900"/> Страница памяти с биографией, фото и видео</li>
              <li className="flex gap-2"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-neutral-900"/> Возможность обновлять материалы без замены таблички</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-neutral-200/70 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h3 className="text-lg font-semibold">Как это выглядит</h3>
            <p className="mt-2 text-sm text-neutral-600">Ниже — реальные фото моих работ и примеров установки.</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {PHOTOS.map((src,i)=>(<PhotoCard key={i} src={src} i={i}/>))}
            </div>
          </div>
        </div>
      </section>

      <Divider/>

      {/* Steps */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">Как это работает</h2>
        <p className="mt-2 text-neutral-700">Простой и прозрачный процесс в 4 шага.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <Step n={1} title="Заявка" text="Вы оставляете заявку и отправляете материалы: фото, даты, краткую биографию."/>
          <Step n={2} title="Дизайн" text="Создаю страницу памяти и даю доступ в личный кабинет для редактирования."/>
          <Step n={3} title="QR и печать" text="Готовлю QR-код с редиректом на страницу памяти и изготавливаю табличку."/>
          <Step n={4} title="Доставка" text="Отправляю табличку удобной доставкой. QR ведёт на вашу страницу памяти."/>
        </div>
      </section>

      <Divider/>

      {/* Why & FAQ */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-neutral-200/70 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h3 className="text-lg font-semibold mb-3">Почему это надёжно</h3>
            <ul className="space-y-2 text-neutral-700 text-sm">
              <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4"/> Собственный редирект: ссылка управляется мной — без сторонних сервисов.</li>
              <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4"/> Материалы хранятся на надёжном хостинге, возможны бэкапы.</li>
              <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4"/> Личный аккаунт: вы редактируете страницу памяти 24/7.</li>
              <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4"/> При необходимости меняю адрес назначения без замены таблички.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-neutral-200/70 bg-white/70 p-6 shadow-sm backdrop-blur">
            <h3 className="text-lg font-semibold mb-3">Частые вопросы</h3>
            <details className="group rounded-xl border p-4">
              <summary className="cursor-pointer select-none font-medium">Что, если изменить информацию на странице?</summary>
              <p className="mt-2 text-sm text-neutral-700">Вы сможете обновлять страницу в личном кабинете — QR останется прежним.</p>
            </details>
            <details className="group mt-3 rounded-xl border p-4">
              <summary className="cursor-pointer select-none font-medium">Работает ли без интернета на кладбище?</summary>
              <p className="mt-2 text-sm text-neutral-700">Для просмотра страницы интернет нужен, но сам QR считывается мгновенно — при наличии связи страница откроется.</p>
            </details>
            <details className="group mt-3 rounded-xl border p-4">
              <summary className="cursor-pointer select-none font-medium">Можно ли сделать индивидуальный дизайн?</summary>
              <p className="mt-2 text-sm text-neutral-700">Да. Подберу материалы, цвет и размер под ваш памятник. Возможна гравировка имени и дат.</p>
            </details>
          </div>
        </div>
      </section>

      <Divider/>

      {/* Portfolio strip */}
      <section id="portfolio" className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold">Примеры работ</h2>
        </div>
        <motion.div className="mt-6 flex gap-6" animate={{x:[0,-300,0]}} transition={{repeat:Infinity,duration:30,ease:'linear'}}>
          {[...PHOTOS,...PHOTOS].map((src,i)=>(
            <img key={i} src={src} className="h-56 w-auto rounded-2xl border shadow-sm" alt="Пример QR Memory"/>
          ))}
        </motion.div>
      </section>

      <Divider/>

      {/* Contact form */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Оставить заявку</h2>
            <p className="mt-2 text-neutral-700">Напишите, и я свяжусь с вами, чтобы уточнить детали.</p>
            <div className="mt-6 space-y-3 text-sm text-neutral-700">
              <div className="flex items-center gap-2"><PhoneCall className="h-4 w-4"/> Телефон/WhatsApp: <span className="font-medium">по запросу</span></div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4"/> Email: <span className="font-medium">hello@{SITE_DOMAIN}</span></div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/> Сайт: <a className="font-medium underline" href={`https://${SITE_DOMAIN}`} target="_blank" rel="noreferrer">{SITE_DOMAIN}</a></div>
            </div>
          </div>
          <form onSubmit={(e)=>e.preventDefault()} className="rounded-3xl border border-neutral-200/70 bg-white/70 p-6 shadow-sm backdrop-blur">
            <div className="grid gap-4">
              <div><label className="text-sm">Ваше имя</label>
                <input required className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-300" placeholder="Иван"/></div>
              <div><label className="text-sm">Контакт (телефон или email)</label>
                <input required className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-300" placeholder="+7… / name@mail.com"/></div>
              <div><label className="text-sm">Комментарий</label>
                <textarea rows={4} className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-300" placeholder="Кого увековечиваем, какие материалы есть…"/></div>
              <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white shadow hover:shadow-md">
                Отправить заявку <ArrowRight className="h-4 w-4"/>
              </button>
              <p className="text-xs text-neutral-500">Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных.</p>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200/70 bg-white/60 py-8 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm md:flex-row">
          <div className="text-neutral-600">© {new Date().getFullYear()} QR Memory. Все права защищены.</div>
          <div className="flex items-center gap-4 text-neutral-600">
            <a className="hover:underline" href={`https://${SITE_DOMAIN}`} target="_blank" rel="noreferrer">{SITE_DOMAIN}</a>
            <span>·</span>
            <a href="#about" className="hover:underline">О проекте</a>
            <span>·</span>
            <a href="#contact" className="hover:underline">Контакты</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

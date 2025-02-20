import { NavBar, NavButton, PackCard } from "components";
import React, { useEffect, useRef, useState } from "react";
import LauncherScreenshot from '../assets/launcher_screenshot.png'
import { PackData } from "data-types";
import { ReactComponent as Logo } from '../assets/logo_box.svg'
import { Download as DownloadIcon } from 'components/svg'

import './home.css'
import { useNavigate } from "react-router-dom";

function SectionContainer({ children, style, className }: { children?: any, style?: React.CSSProperties, className?: string }) {
    return <div className={"container " + className} style={{ padding: 16, ...style }}>
        {children}
    </div>
}

function PackPreview({ type }: { type: 'trending' | 'downloads' | 'newest' }) {
    const [ids, setIds] = useState<string[] | undefined>(undefined)
    const [current, setCurrent] = useState(0)
    const [timer, setTimer] = useState<number | NodeJS.Timer | undefined>(undefined)
    const navigate = useNavigate()
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (async () => {
            const results: { id: string, displayName: string }[] = (await (await fetch('https://api.smithed.dev/v2/packs?limit=10&hidden=false&sort=' + type)).json()).slice(0, 5)

            results.sort((a, b) => (Math.random() - 0.5) * 2)

            setIds(results.map(m => m.id))

        })()
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {

            cardRef.current?.style.setProperty('animation', 'fadeOut 2s')
            setTimeout(() =>
                setCurrent((prevCounter) => (prevCounter + 1) % (ids?.length ?? 1)), 1900
            )
        }, 8000);

        return () => clearInterval(interval);
    }, [ids]);

    if (ids === undefined) {
        return <div style={{ height: 256 }}></div>
    }


    return <div key={current} ref={cardRef} style={{ flexGrow: 1, width: '100%', animation: 'fadeIn 2s', gridArea: type + 'Preview' }}>
        <PackCard id={ids[current]} style={{ width: '100%', height: '256px', boxSizing: 'border-box' }} onClick={() => navigate(`/packs/${ids[current]}`)} />
    </div>
}

function HomeBody() {



    return <div className="container" style={{ boxSizing: 'border-box', gap: 32 }}>
        <div className="container fadeIn homePageIntroPanel" style={{ justifyContent: 'center', flexDirection: 'row', animationDuration: '3s' }}>
            <SectionContainer className="imageContainer" style={{ gridArea: 'logo' }}>
                <Logo className="logo" style={{ fill: 'var(--text)', width: '100%', borderRadius: '50%' }} />
            </SectionContainer>
            <h1 style={{ textDecoration: 'none', fontFamily: 'DoppioOne', marginBottom: 0, gridArea: 'header', width: '100%', textAlign: 'center' }}>WHAT IS <label className="accentText">SMITHED</label>?</h1>
            <p className='pageText' style={{ color: 'var(--subText)', width: '100%', gridArea: 'content' }}>
                Smithed is a set of projects with the express purpose of making datapacks more compatible, easier to manage, and fool proof to install. Smithed is not only a project but a community of passionate people.
            </p>
            <a className='button pageText' href="https://smithed.dev/discord" style={{ padding: 16, gridArea: 'footer', width: 'fit-content', placeSelf: 'center' }}>Join the Discord</a>
        </div>
        <div className="fadeIn trendingContainer" style={{ animationDuration: '4s' }}>
                <h2 style={{marginBottom: '0.33em', gridArea: 'downloadsHeader',textAlign: 'center'}}>Top Downloaded</h2>
                <h2 style={{marginBottom: '0.33em', gridArea: 'trendingHeader',textAlign: 'center'}}>Trending Today</h2>
                <h2 style={{marginBottom: '0.33em', gridArea: 'newestHeader',textAlign: 'center'}}>Recently Added</h2>
                <PackPreview type="downloads" />
                <PackPreview type="trending" />
                <PackPreview type="newest" />
        </div>
        <div className="container fadeIn homePageLauncherPanel">
            <SectionContainer className="imageContainer" style={{ height: '100%', alignItems: 'center', gridArea: 'screenshot' }}>
                <img style={{ width: '100%', border: '4px solid var(--accent)', borderRadius: 'var(--defaultBorderRadius)' }} src={LauncherScreenshot} />
            </SectionContainer>
            <h1 style={{ textDecoration: 'none', fontFamily: 'DoppioOne', marginBottom: 0, gridArea: 'header' }}>THE <label className="accentText">LAUNCHER</label></h1>
            <p className='pageText' style={{ color: 'var(--subText)', gridArea: 'content1' }}>
                Tired of having to manually update your datapacks? Merging all the ones you want to play? What about filtering through tons of incompatible content? The Smithed launcher allows you to play datapacks just like you would mods! By using the launcher, conflicts between datapacks are automatically resolved, resourcepacks are automatically applied and everything is kept separate from your base game. No more cluttered resourcepack folders.
            </p>
            <a className='button pageText' href="https://nightly.link/Smithed-MC/UX/workflows/nightly/master" style={{ display: 'flex', padding: 16, gridArea: 'footer1', flexDirection: 'row' }}><DownloadIcon style={{fill: 'var(--text)', width: 32, marginRight: 16}}/>Experimental Build</a>
            <h2 style={{ marginBottom: 0, gridArea: 'subheading' }}>BUT WAIT</h2>
            <p className='pageText' style={{ color: 'var(--subText)', gridArea: 'content2' }}>
                The majority of the launcher is accessible entirely in your browser, if all you want to do is create and browse, no need to install even more programs!
            </p>
            <a className='button pageText' href="/browse" style={{ padding: 16, gridArea: 'footer2' }}>Take me to the app!</a>
        </div>
        <div className="container" style={{ backgroundColor: 'var(--backgroundAccent)', paddingBottom: 32    }}>
            <div className="container genericPanel" style={{ alignItems: 'start' }}>
                <div className="container" style={{ padding: 16 }}>
                    <h1 style={{ textDecoration: 'none', fontFamily: 'DoppioOne', margin: 0, gridArea: 'header' }}>THE <label className="accentText">LIBRARIES</label></h1>
                    <p className='pageText' style={{ color: 'var(--subText)', gridArea: 'content1' }}>
                        Tired of having to maintain annoying code across all your packs? Want to let your users craft all their items across packs in the same place? Check out our collection of awesome community maintained libraries!
                    </p>
                    <a className='button pageText' href="/smithed" style={{ padding: 16, gridArea: 'footer1' }}>Whatcha got!</a>
                </div>
                <div className="container" style={{ padding: 16 }}>
                    <h1 style={{ textDecoration: 'none', fontFamily: 'DoppioOne', margin: 0, gridArea: 'header' }}>THE <label className="accentText">WIKI</label></h1>
                    <p className='pageText' style={{ color: 'var(--subText)', gridArea: 'content1' }}>
                        What are libraries without some documentation? The answer: an unusable mess of code. Thankfully, we have some!
                    </p>
                    <a className='button pageText' href="https://wiki.smithed.dev" style={{ padding: 16, gridArea: 'footer1' }}>Take me away</a>
                </div>
            </div>
        </div>
    </div>
}

export default function Home(props: any) {
    const [showBody, setShowBody] = useState(false);
    const [smithedText, setSmithedText] = useState(" ")
    const cursorRef = useRef<HTMLDivElement>(null)
    const textDivRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const text = "SMITHED"
        const delay = 200;

        textDivRef.current?.style.setProperty('animation', `pulse ${delay / 1000}s ease-in-out ${delay / 1000}s infinite`)
        for (let i = 0; i < text.length; i++) {
            const startTime = delay * (i + 1);
            setTimeout(() => {
                setSmithedText(text.substring(0, i + 1))
            }, startTime)
        }
        setTimeout(() => {
            setShowBody(true)
        }, (text.length / 3) * delay)
        setTimeout(() => {
            if (cursorRef.current)
                cursorRef.current.hidden = true
            textDivRef.current?.style.setProperty('animation', '')

        }, (text.length + 1) * delay - 20)
    }, [])

    return <div className="container" style={{ width: '100%', boxSizing: 'border-box', position: 'absolute', top: 0, left: 0, height: '100%', overflowY: 'auto', overflowX: 'hidden', justifyContent: 'safe start', gap: 32 }}>
        <header className="header" >
            {"<"}<div ref={textDivRef}><label className="accentText" style={{ fontFamily: 'DoppioOne' }}>{smithedText}</label></div><div className="cursor" ref={cursorRef}></div>{"/>"}
        </header>
        {showBody && <HomeBody />}
    </div>
}
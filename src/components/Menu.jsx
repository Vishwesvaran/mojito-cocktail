import React, { useRef, useState } from 'react'
import { sliderLists } from '../../constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Menu = () => {
    const contentRef = useRef()
    const [currentIndex, setCurrentIndex] = useState(0)
    const totalCocktails = sliderLists.length
    const goToSilde = (index) => {
        const newIndex = (index + totalCocktails) % totalCocktails

        setCurrentIndex(newIndex)
    }

    const getCocktailAt = (indexOffset) => {
        return sliderLists[(currentIndex + indexOffset + totalCocktails) % totalCocktails]
    }

    const currentCocktail = getCocktailAt(0)
    const prevCocktail = getCocktailAt(-1)
    const nextCocktail = getCocktailAt(1)




    useGSAP(() => {
        gsap.fromTo('#title', { opacity: 0, xPercent: -100 }, { opacity: 1, duration: 1, xPercent: 0 })
        gsap.fromTo('.cocktail img', { opacity: 0, yPercent: -50 }, { yPercent: 0, opacity: 1, duration: 1, ease: 'power1.inOut' })
        gsap.fromTo('.details h2', { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 100, ease: 'power1.inOut' })
        gsap.fromTo('.details p', { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 100, ease: 'power1.inOut' })
        gsap.fromTo('#m-left-leaf', { translateX:-100, translateY:100,  opacity: 0 }, { translateX: 0, translateY:0, duration: 1,opacity: 100, ease: 'power1.inOut' })
        gsap.fromTo('#m-right-leaf', { translateX:100,  translateY:-100, opacity: 0 }, {translateX: 0, translateY:0, duration: 1, rotation: 0, opacity: 100, ease: 'power1.inOut' })

    }, [currentIndex])
    return (
        <section id='menu' aria-labelledby='menu-heading' className='overflow-hidden'>
            <img src="/images/slider-left-leaf.png" alt="left-leaf" id='m-left-leaf'  />
            <img src="/images/slider-right-leaf.png" alt="right-leaf" id='m-right-leaf' />
            <h2 id='menu-heading' className='sr-only'>
                Cocktail Menu
            </h2>
            <nav className='cocktail-tabs' aria-label='Coctail Navigation'>
                {sliderLists.map((cocktail, idx) => {
                    const isActive = idx === currentIndex;

                    return (
                        <button className={`${isActive ? 'text-white border-white' : 'text-white/50 border-white/50'}`} key={cocktail.id} onClick={() => goToSilde(idx)}>
                            {cocktail.name}
                        </button>
                    )
                })}
            </nav>
            <div className='content'>
                <div className="arrows">
                    <button className='text-left' onClick={() => goToSilde(currentIndex - 1)}>
                        <span>{prevCocktail.name}</span>
                        <img src="/images/right-arrow.png" alt="right-arrow" aria-hidden="true" />
                    </button>
                    <button className='text-left' onClick={() => goToSilde(currentIndex + 1)}>
                        <span>{nextCocktail.name}</span>
                        <img src="/images/left-arrow.png" alt="left-arrow" aria-hidden="true" />
                    </button>
                </div>
                <div className='cocktail'>
                    <img src={currentCocktail.image} alt="" className='object-contain' />
                </div>

                <div className='recipe'>
                    <div ref={contentRef} className='info'>
                        <p>Recipe for:</p>
                        <p id='title'>{currentCocktail.name}</p>
                    </div>
                    <div className='details'>
                        <h2>{currentCocktail.title}</h2>
                        <p>{currentCocktail.description}</p>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default Menu
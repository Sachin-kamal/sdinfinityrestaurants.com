/**
* Website: S&D Infinity Restaurant
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/mamba-one-page-bootstrap-template-free/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators")
  let heroCarouselItems = select('#heroCarousel .carousel-item', true)

  if (heroCarouselIndicators && heroCarouselItems.length) {
    heroCarouselItems.forEach((item, index) => {
      const indicator = document.createElement('button')
      indicator.type = 'button'
      indicator.setAttribute('aria-label', `Show slide ${index + 1}`)
      indicator.setAttribute('aria-current', index === 0 ? 'true' : 'false')
      indicator.classList.toggle('active', index === 0)
      indicator.addEventListener('click', () => showCarouselSlide(index))
      heroCarouselIndicators.appendChild(indicator)
    })

    let activeSlide = 0
    const showCarouselSlide = (index) => {
      activeSlide = (index + heroCarouselItems.length) % heroCarouselItems.length
      heroCarouselItems.forEach((item, itemIndex) => {
        const active = itemIndex === activeSlide
        item.classList.toggle('active', active)
        const indicator = heroCarouselIndicators.children[itemIndex]
        indicator.classList.toggle('active', active)
        indicator.setAttribute('aria-current', active ? 'true' : 'false')
      })
    }

    document.querySelectorAll('#heroCarousel [data-bs-slide]').forEach(control => {
      control.addEventListener('click', event => {
        event.preventDefault()
        showCarouselSlide(activeSlide + (control.dataset.bsSlide === 'next' ? 1 : -1))
      })
    })

    const interval = Number(select('#heroCarousel').dataset.bsInterval) || 5200
    window.setInterval(() => showCarouselSlide(activeSlide + 1), interval)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    document.body.classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  on('click', '[data-bs-toggle="collapse"]', function(e) {
    e.preventDefault()
    const panel = select(this.getAttribute('href'))
    if (!panel) return
    const expanded = panel.classList.toggle('show')
    this.classList.toggle('collapsed', !expanded)
    this.setAttribute('aria-expanded', String(expanded))
  }, true)

  const closeMobileNav = () => {
    let navbar = select('#navbar')
    let navbarToggle = select('.mobile-nav-toggle')
    if (navbar.classList.contains('navbar-mobile')) {
      navbar.classList.remove('navbar-mobile')
      document.body.classList.remove('mobile-nav-active')
      if (navbarToggle) {
        navbarToggle.classList.remove('bi-x')
        navbarToggle.classList.add('bi-list')
      }
    }
  }

  const checkMobileNavBreakpoint = () => {
    if (window.innerWidth >= 992) {
      closeMobileNav()
    }
  }

  window.addEventListener('resize', checkMobileNavBreakpoint)
  window.addEventListener('load', checkMobileNavBreakpoint)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        closeMobileNav()
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  on('click', '.portfolio-lightbox', function(event) {
    event.preventDefault()
    const lightbox = document.querySelector('.image-lightbox') || document.createElement('dialog')
    lightbox.className = 'image-lightbox'
    if (!lightbox.isConnected) {
      lightbox.innerHTML = '<button class="image-lightbox-close" type="button" aria-label="Close">&times;</button><img alt="">'
      document.body.appendChild(lightbox)
      lightbox.querySelector('button').addEventListener('click', () => lightbox.close())
      lightbox.addEventListener('click', event => {
        if (event.target === lightbox) lightbox.close()
      })
    }
    const image = lightbox.querySelector('img')
    image.src = this.href
    image.alt = this.title || ''
    lightbox.showModal()
  })

  on('click', '#portfolio-flters li', function(event) {
    event.preventDefault()
    const filter = this.getAttribute('data-filter')
    select('#portfolio-flters li', true).forEach(item => item.classList.toggle('filter-active', item === this))
    select('.portfolio-item', true).forEach(item => {
      item.hidden = filter !== '*' && !item.matches(filter)
    })
  }, true)

  document.querySelectorAll('.enquiry-form').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault()
      const values = new FormData(form)
      const recipient = 'info@sdinfinitytechnologies.com'
      const subject = String(values.get('subject') || 'Restaurant enquiry')
      const body = [
        `Name: ${values.get('name') || ''}`,
        `Email: ${values.get('email') || ''}`,
        `Subject: ${subject}`,
        '',
        'Message:',
        String(values.get('message') || '')
      ].join('\n')
      const status = form.querySelector('.sent-message') || document.createElement('p')
      status.className = 'sent-message'
      status.setAttribute('role', 'status')
      status.setAttribute('aria-live', 'polite')
      status.textContent = 'Your email app is opening with the enquiry prepared. Send the email there to complete your request.'
      if (!status.isConnected) form.appendChild(status)
      status.hidden = false
      status.style.display = 'block'
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    })
  })

})()
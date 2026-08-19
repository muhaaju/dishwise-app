import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Modern & Clean */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-lg bg-white/90">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <span className="text-2xl">🍽️</span>
              </div>
              <span className="text-2xl font-display font-bold text-primary">DishWise</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/#about" className="text-text hover:text-primary font-medium transition-colors">
                About
              </Link>
              <Link href="/restaurants" className="text-text hover:text-primary font-medium transition-colors">
                Restaurants
              </Link>
              <Link href="/#savings" className="text-text hover:text-primary font-medium transition-colors">
                Savings
              </Link>
              <Link href="/#contact" className="text-text hover:text-primary font-medium transition-colors">
                Get in Touch
              </Link>
              <Link href="/restaurants" className="px-6 py-2.5 bg-cta text-white rounded-xl font-semibold hover:bg-cta-dark transition-all hover:shadow-lg">
                Order Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Bold Value Proposition */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary-light">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Heading - Powerful */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
              ORDER SMART
              <br />
              <span className="text-highlight">SAVE MORE</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Why pay 30% more to delivery apps? Order direct from restaurants and keep the savings.
            </p>

            {/* CTA Button */}
            <Link 
              href="/restaurants"
              className="inline-flex items-center gap-3 px-10 py-5 bg-cta text-white rounded-2xl text-xl font-bold hover:bg-cta-dark transition-all shadow-2xl hover:shadow-3xl hover:scale-105"
            >
              <span>Start Saving Today</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
              ESSENTIAL TOOLS FOR SMARTER FOOD ORDERING
            </h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Choose the plan that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Premium Restaurant Partners Voucher */}
            <div className="bg-white rounded-3xl p-8 shadow-card hover:shadow-xl transition-all border-2 border-gray-100 hover:border-primary/30">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🎫</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Premium Voucher</h3>
                <p className="text-text-muted mb-4">One-time purchase</p>
                <div className="text-4xl font-bold text-primary mb-2">₹500</div>
                <p className="text-sm text-text-muted">Worth ₹650 on delivery apps</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-text-muted">Access to 50+ premium restaurants</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-text-muted">Valid for 6 months</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-text-muted">Save ₹150 instantly</span>
                </li>
              </ul>
              <Link href="/restaurants" className="block w-full py-3 bg-primary text-white rounded-xl font-bold text-center hover:bg-primary-dark transition-all">
                Get Voucher
              </Link>
            </div>

            {/* Monthly Subscription */}
            <div className="bg-gradient-to-br from-highlight/10 to-highlight/5 rounded-3xl p-8 shadow-xl border-2 border-highlight/30 relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="bg-highlight text-white px-3 py-1 rounded-full text-xs font-bold">POPULAR</span>
              </div>
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-highlight to-highlight-dark rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">⭐</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Monthly Plan</h3>
                <p className="text-text-muted mb-4">Best value for regulars</p>
                <div className="text-4xl font-bold text-primary mb-2">₹149/mo</div>
                <p className="text-sm text-text-muted">Save ₹600+ monthly</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-text-muted">Unlimited orders</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-text-muted">Priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-text-muted">Exclusive restaurant deals</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-text-muted">Cancel anytime</span>
                </li>
              </ul>
              <Link href="/restaurants" className="block w-full py-3 bg-highlight text-white rounded-xl font-bold text-center hover:bg-highlight-dark transition-all">
                Subscribe Now
              </Link>
            </div>

            {/* Gift Card */}
            <div className="bg-white rounded-3xl p-8 shadow-card hover:shadow-xl transition-all border-2 border-gray-100 hover:border-primary/30">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-cta to-cta-dark rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🎁</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Gift Card</h3>
                <p className="text-text-muted mb-4">Perfect for gifting</p>
                <div className="text-4xl font-bold text-primary mb-2">₹1000</div>
                <p className="text-sm text-text-muted">Worth ₹1300 on delivery apps</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-text-muted">Redeemable at any restaurant</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-text-muted">Valid for 1 year</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-text-muted">Digital delivery</span>
                </li>
              </ul>
              <Link href="/restaurants" className="block w-full py-3 bg-primary text-white rounded-xl font-bold text-center hover:bg-primary-dark transition-all">
                Buy Gift Card
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-white to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-6">
              WHY PAY MORE WHEN YOU CAN SAVE WITH EVERY SINGLE ORDER?
            </h2>
            <p className="text-xl text-text-muted mb-8 leading-relaxed">
              Food delivery apps charge restaurants up to <span className="font-bold text-red-600">30% commission</span>. 
              Restaurants pass these costs to you through higher menu prices. 
              With DishWise, you order direct and keep the savings.
            </p>
            <Link 
              href="/restaurants"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cta text-white rounded-xl font-bold hover:bg-cta-dark transition-all hover:shadow-lg"
            >
              <span>See the Difference</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose DishWise */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
              WHY CHOOSE DISHWISE FOR YOUR FOOD ORDERS?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Transparent Pricing */}
            <div className="group bg-white rounded-3xl p-8 shadow-card hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Transparent Pricing</h3>
              <p className="text-text-muted leading-relaxed">
                See exact price comparisons with Swiggy and Zomato. No hidden fees, no surprises. Just honest pricing.
              </p>
            </div>

            {/* Direct Restaurant Ordering */}
            <div className="group bg-white rounded-3xl p-8 shadow-card hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-highlight to-highlight-dark rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🏪</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Direct Restaurant Ordering</h3>
              <p className="text-text-muted leading-relaxed">
                Order directly from restaurants. More money goes to local businesses, not middlemen platforms.
              </p>
            </div>

            {/* Maximum Savings */}
            <div className="group bg-white rounded-3xl p-8 shadow-card hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-cta to-cta-dark rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Maximum Savings</h3>
              <p className="text-text-muted leading-relaxed">
                Save ₹70-150 on every order. No platform fees, no delivery charges for pickup. Pure savings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Savings Plans */}
      <section id="savings" className="py-20 bg-gradient-to-b from-white to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
                DISHWISE SAVINGS PLANS
              </h2>
              <p className="text-xl text-text-muted">
                Flexible options for every type of food lover
              </p>
            </div>

            <div className="space-y-8">
              {/* For Individuals */}
              <div className="bg-white rounded-3xl p-8 shadow-card border border-gray-100">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">👤</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary mb-3">For Individuals</h3>
                    <p className="text-text-muted mb-4 leading-relaxed">
                      Order 2-3 times a week? Save <span className="font-bold text-highlight-dark">₹300-450 monthly</span> compared to delivery apps. 
                      That's enough for an extra meal every month!
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="px-4 py-2 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-sm text-text-muted">Monthly Savings</div>
                        <div className="text-xl font-bold text-green-600">₹300-450</div>
                      </div>
                      <div className="px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-sm text-text-muted">Yearly Savings</div>
                        <div className="text-xl font-bold text-blue-600">₹3,600-5,400</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* For Families */}
              <div className="bg-white rounded-3xl p-8 shadow-card border border-gray-100">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-highlight/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">👨‍👩‍👧‍👦</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary mb-3">For Families</h3>
                    <p className="text-text-muted mb-4 leading-relaxed">
                      Ordering for the whole family? Save <span className="font-bold text-highlight-dark">₹600-900 monthly</span>. 
                      Larger orders mean bigger savings. Use the extra for family outings!
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="px-4 py-2 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-sm text-text-muted">Monthly Savings</div>
                        <div className="text-xl font-bold text-green-600">₹600-900</div>
                      </div>
                      <div className="px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-sm text-text-muted">Yearly Savings</div>
                        <div className="text-xl font-bold text-blue-600">₹7,200-10,800</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* For Offices */}
              <div className="bg-white rounded-3xl p-8 shadow-card border border-gray-100">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-cta/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">🏢</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary mb-3">For Offices & Teams</h3>
                    <p className="text-text-muted mb-4 leading-relaxed">
                      Team lunches and office orders? Save <span className="font-bold text-highlight-dark">₹1,500+ monthly</span>. 
                      Bulk orders mean maximum savings. Perfect for team building on a budget!
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="px-4 py-2 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-sm text-text-muted">Monthly Savings</div>
                        <div className="text-xl font-bold text-green-600">₹1,500+</div>
                      </div>
                      <div className="px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-sm text-text-muted">Yearly Savings</div>
                        <div className="text-xl font-bold text-blue-600">₹18,000+</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link 
                href="/restaurants"
                className="inline-flex items-center gap-3 px-10 py-5 bg-cta text-white rounded-2xl text-xl font-bold hover:bg-cta-dark transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <span>Start Saving Now</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories / Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
              SUCCESS STORIES FROM THE DISHWISE COMMUNITY
            </h2>
            <p className="text-xl text-text-muted">
              Real savings from real customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-gradient-to-br from-background to-white rounded-3xl p-8 shadow-card border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  R
                </div>
                <div>
                  <div className="font-bold text-primary text-lg">Rahul M.</div>
                  <div className="text-sm text-text-muted">Software Engineer</div>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-text-muted leading-relaxed italic">
                "I was spending ₹2000+ monthly on Swiggy. With DishWise, I'm saving ₹500-600 every month. 
                Same restaurants, same food, way better prices!"
              </p>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-text-muted">Monthly Savings</div>
                <div className="text-2xl font-bold text-highlight-dark">₹500-600</div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gradient-to-br from-background to-white rounded-3xl p-8 shadow-card border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-highlight rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  P
                </div>
                <div>
                  <div className="font-bold text-primary text-lg">Priya S.</div>
                  <div className="text-sm text-text-muted">Marketing Manager</div>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-text-muted leading-relaxed italic">
                "Our office team orders lunch 3 times a week. DishWise saves us ₹1200+ monthly. 
                We use the savings for team outings. Win-win!"
              </p>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-text-muted">Team Monthly Savings</div>
                <div className="text-2xl font-bold text-highlight-dark">₹1,200+</div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-gradient-to-br from-background to-white rounded-3xl p-8 shadow-card border border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-cta rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  A
                </div>
                <div>
                  <div className="font-bold text-primary text-lg">Arun K.</div>
                  <div className="text-sm text-text-muted">Student</div>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-text-muted leading-relaxed italic">
                "As a student on a budget, every rupee counts. DishWise helps me eat good food without breaking the bank. 
                Saved ₹300 last month alone!"
              </p>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-text-muted">Monthly Savings</div>
                <div className="text-2xl font-bold text-highlight-dark">₹300+</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Events Section */}
      <section className="py-20 bg-gradient-to-b from-white to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
              JOIN OUR FOOD COMMUNITY EVENTS
            </h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              More than just savings - be part of a community that loves good food
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Event 1 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-card border border-gray-100 hover:shadow-xl transition-all">
              <div className="h-48 bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <span className="text-7xl">🍜</span>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-highlight/10 text-highlight-dark rounded-full text-sm font-bold">Monthly</span>
                  <span className="text-text-muted text-sm">•</span>
                  <span className="text-text-muted text-sm">Last Saturday</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">Food Tasting Meetups</h3>
                <p className="text-text-muted leading-relaxed mb-6">
                  Discover new restaurants, meet fellow food lovers, and enjoy exclusive tasting menus at member-only prices.
                </p>
                <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all">
                  Join Next Event
                </button>
              </div>
            </div>

            {/* Event 2 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-card border border-gray-100 hover:shadow-xl transition-all">
              <div className="h-48 bg-gradient-to-br from-highlight to-highlight-dark flex items-center justify-center">
                <span className="text-7xl">👨‍🍳</span>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-cta/10 text-cta-dark rounded-full text-sm font-bold">Quarterly</span>
                  <span className="text-text-muted text-sm">•</span>
                  <span className="text-text-muted text-sm">Next: March 2026</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">Chef Collaboration Dinners</h3>
                <p className="text-text-muted leading-relaxed mb-6">
                  Exclusive dinners where partner chefs create special menus. Limited seats, unforgettable experiences.
                </p>
                <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all">
                  Reserve Seat
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Detailed */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
              HOW DISHWISE TRANSFORMS YOUR FOOD ORDERING
            </h2>
            <p className="text-xl text-text-muted">
              Simple, transparent, and designed to save you money
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-highlight to-cta transform -translate-x-1/2"></div>

              {/* Steps */}
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative flex items-center gap-8">
                  <div className="flex-1 text-right hidden md:block">
                    <h3 className="text-2xl font-bold text-primary mb-2">Browse & Compare</h3>
                    <p className="text-text-muted">
                      See real-time price comparisons with Swiggy & Zomato. Know exactly how much you're saving before you order.
                    </p>
                  </div>
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    1
                  </div>
                  <div className="flex-1 md:hidden">
                    <h3 className="text-2xl font-bold text-primary mb-2">Browse & Compare</h3>
                    <p className="text-text-muted">
                      See real-time price comparisons with Swiggy & Zomato. Know exactly how much you're saving before you order.
                    </p>
                  </div>
                  <div className="flex-1 hidden md:block"></div>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-center gap-8">
                  <div className="flex-1 hidden md:block"></div>
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-gradient-to-br from-highlight to-highlight-dark rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary mb-2">Order Direct</h3>
                    <p className="text-text-muted">
                      Place your order directly with the restaurant. No middleman, no extra fees, no hidden charges.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-center gap-8">
                  <div className="flex-1 text-right hidden md:block">
                    <h3 className="text-2xl font-bold text-primary mb-2">Choose Pickup or Delivery</h3>
                    <p className="text-text-muted">
                      Pick up for maximum savings, or choose delivery options. You're in control of your costs.
                    </p>
                  </div>
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-gradient-to-br from-cta to-cta-dark rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    3
                  </div>
                  <div className="flex-1 md:hidden">
                    <h3 className="text-2xl font-bold text-primary mb-2">Choose Pickup or Delivery</h3>
                    <p className="text-text-muted">
                      Pick up for maximum savings, or choose delivery options. You're in control of your costs.
                    </p>
                  </div>
                  <div className="flex-1 hidden md:block"></div>
                </div>

                {/* Step 4 */}
                <div className="relative flex items-center gap-8">
                  <div className="flex-1 hidden md:block"></div>
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary mb-2">Enjoy & Save</h3>
                    <p className="text-text-muted">
                      Get your food and see your savings add up. Track your monthly savings in your account dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link 
              href="/restaurants"
              className="inline-flex items-center gap-3 px-10 py-5 bg-cta text-white rounded-2xl text-xl font-bold hover:bg-cta-dark transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              <span>See How</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary-light relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join hundreds of smart diners in Kochi who save money by ordering direct
          </p>
          <Link 
            href="/restaurants"
            className="inline-flex items-center gap-3 px-10 py-5 bg-cta text-white rounded-2xl text-xl font-bold hover:bg-cta-dark transition-all shadow-2xl hover:shadow-3xl hover:scale-105"
          >
            <span>Browse Restaurants</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-primary-dark text-white">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-highlight to-highlight-dark rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🍽️</span>
                </div>
                <span className="text-2xl font-display font-bold">DishWise</span>
              </div>
              <p className="text-white/70 leading-relaxed max-w-md mb-6">
                Empowering customers with price transparency and helping local restaurants thrive in Kochi.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="/#about" className="text-white/70 hover:text-highlight transition-colors">About</Link></li>
                <li><Link href="/restaurants" className="text-white/70 hover:text-highlight transition-colors">Restaurants</Link></li>
                <li><Link href="/#savings" className="text-white/70 hover:text-highlight transition-colors">Savings</Link></li>
                <li><Link href="/#how-it-works" className="text-white/70 hover:text-highlight transition-colors">How It Works</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-4">Get in Touch</h4>
              <ul className="space-y-3 text-white/70">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  hello@dishwise.app
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 98765 43210
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Kochi, Kerala
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              &copy; 2026 DishWise. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-white/60">
              <Link href="/privacy" className="hover:text-highlight transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-highlight transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
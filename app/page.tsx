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
              <Link href="/restaurants" className="text-text hover:text-primary font-medium transition-colors">
                Restaurants
              </Link>
              <Link href="/track-order" className="text-text hover:text-primary font-medium transition-colors">
                Track Order
              </Link>
              <Link href="/admin/login" className="px-5 py-2.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-all hover:shadow-lg">
                Admin Login
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

      {/* Hero Section - Modern Gradient */}
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
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-highlight rounded-full animate-pulse"></span>
              Save ₹70-150 on every order
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Order Direct,
              <br />
              <span className="text-highlight">Save More</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Compare prices with Swiggy & Zomato. See exactly how much you save by ordering direct for pickup.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/restaurants"
                className="group px-8 py-4 bg-cta text-white rounded-2xl text-lg font-bold hover:bg-cta-dark transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-2"
              >
                Browse Restaurants
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                href="#how-it-works"
                className="px-8 py-4 bg-white text-primary rounded-2xl text-lg font-bold hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                How It Works
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-highlight" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>100% Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-highlight" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-highlight" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Instant Confirmation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">₹150</div>
              <div className="text-text-muted font-medium">Avg. Savings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</div>
              <div className="text-text-muted font-medium">Restaurants</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">1000+</div>
              <div className="text-text-muted font-medium">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">30min</div>
              <div className="text-text-muted font-medium">Avg. Pickup Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition - Card Style */}
      <section className="py-20 bg-gradient-to-b from-white to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
              Why Choose DishWise?
            </h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Experience the smarter way to order food
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1 - Savings */}
            <div className="group bg-white rounded-3xl p-8 shadow-card hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-highlight to-highlight-dark rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">💰</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Save Big</h3>
              <p className="text-text-muted leading-relaxed mb-4">
                Skip platform fees, delivery charges, and price markups. Save ₹70-150 on every order.
              </p>
              <div className="flex items-center gap-2 text-highlight-dark font-semibold">
                <span>Learn more</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Card 2 - Transparency */}
            <div className="group bg-white rounded-3xl p-8 shadow-card hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Full Transparency</h3>
              <p className="text-text-muted leading-relaxed mb-4">
                See exact price comparisons with Swiggy and Zomato. No hidden fees, ever.
              </p>
              <div className="flex items-center gap-2 text-highlight-dark font-semibold">
                <span>Learn more</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Card 3 - Support Local */}
            <div className="group bg-white rounded-3xl p-8 shadow-card hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-cta to-cta-dark rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🏪</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary">Support Local</h3>
              <p className="text-text-muted leading-relaxed mb-4">
                More money goes to restaurants. Help local businesses thrive in your community.
              </p>
              <div className="flex items-center gap-2 text-highlight-dark font-semibold">
                <span>Learn more</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Timeline Style */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4">
              How It Works
            </h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Four simple steps to start saving
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
                    <h3 className="text-2xl font-bold text-primary mb-2">Browse Restaurants</h3>
                    <p className="text-text-muted">
                      Explore local restaurants and view menus with transparent pricing
                    </p>
                  </div>
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    1
                  </div>
                  <div className="flex-1 md:hidden">
                    <h3 className="text-2xl font-bold text-primary mb-2">Browse Restaurants</h3>
                    <p className="text-text-muted">
                      Explore local restaurants and view menus with transparent pricing
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
                    <h3 className="text-2xl font-bold text-primary mb-2">Compare Prices</h3>
                    <p className="text-text-muted">
                      See direct prices vs Swiggy & Zomato with detailed fee breakdowns
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-center gap-8">
                  <div className="flex-1 text-right hidden md:block">
                    <h3 className="text-2xl font-bold text-primary mb-2">Order & Pay</h3>
                    <p className="text-text-muted">
                      Place your order, pay securely, and schedule pickup time
                    </p>
                  </div>
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-gradient-to-br from-cta to-cta-dark rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    3
                  </div>
                  <div className="flex-1 md:hidden">
                    <h3 className="text-2xl font-bold text-primary mb-2">Order & Pay</h3>
                    <p className="text-text-muted">
                      Place your order, pay securely, and schedule pickup time
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
                    <h3 className="text-2xl font-bold text-primary mb-2">Pickup & Enjoy</h3>
                    <p className="text-text-muted">
                      Collect your order and enjoy your savings!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Bold */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary-light relative overflow-hidden">
        {/* Background Pattern */}
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

      {/* Footer - Modern */}
      <footer className="bg-primary-dark text-white">
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
              <p className="text-white/70 leading-relaxed max-w-md">
                Empowering customers with price transparency and helping local restaurants thrive in Kochi.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="/restaurants" className="text-white/70 hover:text-highlight transition-colors">Restaurants</Link></li>
                <li><Link href="/track-order" className="text-white/70 hover:text-highlight transition-colors">Track Order</Link></li>
                <li><Link href="#how-it-works" className="text-white/70 hover:text-highlight transition-colors">How It Works</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
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

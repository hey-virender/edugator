import React from 'react'

import ComponentCard from '@/components/ComponentCard';
import CompanionsList from '@/components/CompanionsList';
import CTA from '@/components/CTA';
import { recentSessions } from '@/constants';

const Page = () => {
  return (
    <main>
      <h1 className="text-2xl underline">Popular Companions</h1>
        <section className="home-section">
          <ComponentCard id="123" name="Test Name" topic="Test topic" subject="Test Subject" duration={45} color="#ffda06" />
          <ComponentCard id="1234" name="Test Name 2" topic="Test topic 2" subject="Test Subject 2" duration={45} color="#ff0a06" />
          <ComponentCard id="12345" name="Test Name 3" topic="Test topic 3" subject="Test Subject 3" duration={45} color="#fada06" />
        </section>
        <section className="home-section">
          <CompanionsList
          title="Recently Completed Sessions"
          companions={recentSessions}
          classNames="w-2/3 max-lg:w-full"

          />
          <CTA/>
        </section>
    </main>
  )
}

export default Page
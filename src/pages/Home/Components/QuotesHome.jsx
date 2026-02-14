import React from 'react'

const QuotesHome = (children) => {
  return (
    <section>
      <div className="quotestoday flex flex-col gap-3 p-6 rounded-2xl w-full mb-5 bg-white/50 backdrop-blur-md border border-white/60 shadow-lg shadow-emerald-100/50">
        <h1 className='text-sm font-bold text-emerald-600 uppercase tracking-wider'>Quotes of the Day</h1>
        <div className="quotes py-3">
          <p className='text-lg px-6 italic text-center text-gray-700 leading-relaxed'>"{children.quotes}"</p>
        </div>
        <div className='flex items-center justify-center gap-2'>
          <div className='w-8 h-px bg-emerald-400'></div>
          <h2 className='font-semibold text-center text-emerald-700 text-sm'>{children.sumber}</h2>
          <div className='w-8 h-px bg-emerald-400'></div>
        </div>
      </div>
    </section>
  )
}

export default QuotesHome
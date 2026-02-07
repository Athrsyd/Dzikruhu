import React from 'react'

const QuotesHome = (children) => {
  return (
                <section>
                <div className="quotestoday flex flex-col gap-3 p-5 rounded-2xl w-full mb-5">
                    <h1 className='text-lg font-bold mb-3'>Quotes of the Day :</h1>
                    <div className="quotes">
                        <p className='text-lg px-10 italic text-center'> "{children.quotes}"</p>
                    </div>
                    <h2 className='font-bold text-center mt-3'> — {children.sumber}</h2>
                </div>
            </section>
  )
}

export default QuotesHome
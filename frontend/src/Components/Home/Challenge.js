import React from 'react'

const Challenge = ({challenges}) => {
  return (
    <div className="min-h-screen bg-gray-100 p-10 w-screen">
    <h1 className="text-4xl font-bold text-gray-800 mb-6">Challenges</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {challenges.length === 0 ? (
        <p className="text-gray-600 text-lg">No challenges available</p>
      ) : (
        challenges.map((challenge) => (
          <div 
            key={challenge.id} 
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
          >
            <h2 className="text-2xl font-semibold text-gray-900">{challenge.title}</h2>
            <p className="text-gray-700 mt-2">{challenge.description}</p>
            <div className="mt-4">
              <p className="text-sm text-gray-600"><strong>Difficulty:</strong> {challenge.difficulty}</p>
              <p className="text-sm text-gray-600"><strong>Points:</strong> {challenge.points}</p>
              <p className="text-sm text-gray-600"><strong>Category:</strong> {challenge.category}</p>
              <p className="text-sm text-gray-600"><strong>Posted by:</strong> {challenge.post_by}</p>
              <p className="text-sm text-gray-600"><strong>Created at:</strong> {new Date(challenge.created_at).toLocaleString()}</p>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
  )
}

export default Challenge
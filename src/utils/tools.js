import React from 'react'

export const getReferee = () =>
  window.location.pathname.replace(/^\/([^/]*).*$/, '$1') === 'referee'

export const preVoteUsrMsg = flagSelected => (
  <h2 className="Question">
    I want to vote for{flagSelected ? (
      <span className="QuestionName">{` ${flagSelected.country}!`}</span>
    ) : (
      '...'
    )}
  </h2>
)

export const preVoteRefMsg = flagSelected => (
  <h2 className="Question">
    I want to declare
    {flagSelected ? (
      <span className="QuestionName">{` ${flagSelected.country} `}</span>
    ) : (
      ' ... '
    )}
    as the winner!
  </h2>
)

export const postVoteUsrMsg = (
  <h2 className="Question">Your vote has been submitted!</h2>
)

export const postVoteRefMsg = (
  <h2 className="Question">Your team has been made the winner!</h2>
)

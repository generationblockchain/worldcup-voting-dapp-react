import React from 'react'

export const checkRefereeURL = () =>
  window.location.pathname.replace(/^\/([^/]*).*$/, '$1') === 'referee'

export const winnerUsrMsg = winner =>
  winner ? (
    <h2 className="Question">
      {<span className="QuestionName">{`${winner.country} `}</span>}
      won the World Cup!
    </h2>
  ) : null

export const winnerRefMsg = winner =>
  winner ? (
    <h2 className="Question">
      You have made
      {<span className="QuestionName">{` ${winner.country} `}</span>}
      the winner!
    </h2>
  ) : null

export const preVoteUsrMsg = flagSelected => (
  <h2 className="Question">
    I vote that the winner of World Cup 2018 will be{' '}
    {flagSelected ? (
      <span className="QuestionName">{` ${flagSelected.country}!`}</span>
    ) : (
      '...'
    )}
  </h2>
)

export const preVoteRefMsg = flagSelected => (
  <h2 className="Question">
    Referee, declare
    {flagSelected ? (
      <span className="QuestionName">{` ${flagSelected.country} `}</span>
    ) : (
      ' ... '
    )}
    as the winner!
  </h2>
)

export const postVoteUsrMsg = (
  <h2 className="Question">Vote submitted, hang in there...</h2>
)

export const postVoteRefMsg = (
  <h2 className="Question">Your team has been made the winner!</h2>
)

pragma solidity ^0.4.2;
// Specify compiler version we are using.
// Note: this code is written using the latest solidity best practices,
// for example using 'constructor(){}' rather than 'function GBWorldCupVotingGame(){}'
// and using string return values for require() statements

contract GBWorldCupVotingGame {
    
    /* CONTRACT STATE VARIABLES */
    
    // State machine for this voting game,
    // tracking which state of gameplay we are in.
    enum GameState { 
        AcceptingVotes,
        WinnerDeclared,
        PayoutsCompleted
    }
    
    // A vote object tracks the address of the account that voted
    // and the Ether backing the account staked against the vote (denominated in wei)
    struct Vote {
        address voter;
        uint voteBackingInWei;
    }
    
    // keep track of total Ether backing for each team (denominated in wei)
    mapping (bytes32 => uint) teamBackingInWei;
    
    // keep track of Votes for each team, so that payouts can be computed in the future
    mapping (bytes32 => Vote[]) teamVotes;
    
    uint totalNumVotes;
    uint totalVoteBacking;
    
    // We include the 'private' here just for educational purposes.
    // The use of 'private' does not hide the value of the variable.
    // Contract data storage (on EtherScan, e.g.) would still reveal value of 'currentState'.
    // It simply prevents solidity from making an automatic getter function for it
    GameState private currentState; 
    
    // The ONLY address that is allowed to declare game outcome
    // and restart game
    address public gameReferee;
    
    // Solidity doesn't let you pass in an array of strings in the constructor (yet).
    // We will use an array of bytes32 instead to store the list of teams
    // available for voting.
    bytes32[] public teamNames;
  
    uint gameIterationCounter;
    
    /* CUSTOM FUNCTION MODIFIERS */
    
    modifier forRefereeOnly() {
        require(msg.sender == gameReferee);
        _;
    }
    
    modifier inState(GameState _state) {
        require(currentState == _state);
        _;
    }
    
    /* EVENTS */
    event GameStarted(uint indexed gameIteration, address referee);
    event NewVote(uint indexed gameIteration, address voter, bytes32 teamName, uint backingInWei);
    event WinnerDeclared(uint indexed gameIteration, bytes32 winningTeam);
    event PayoutsCompleted(uint indexed gameIteration);
    
    /* CONSTRUCTOR */
    constructor(bytes32[] _teamNames) public {
        
        // This is the FIRST time the game is being played.
        // subsequent iterations of the game will not require constructor to be called
        gameIterationCounter = 1;
        
        // start out in the "accepting votes" state
        currentState = GameState.AcceptingVotes;
        
        // store a reference to this list of team names
        // we'll be using it elsewhere in the contract
        teamNames = _teamNames;
        
        // assign the role of referee to the creator of this contract
        gameReferee = msg.sender;
        
        // go through each team name
        for (uint i = 0; i < teamNames.length; i++) {
            
            // and initialize backing for all teams to zero.
            // we'll increment this later as votes come in
            teamBackingInWei[teamNames[i]] = 0;
        }
        
    }
    
    /* FUNCTIONS (TRANSACTIONS) 
     * 
     * These change the state of our system,
     * and take time to return.
     */
    
    function voteForTeam(bytes32 _teamName) public payable inState(GameState.AcceptingVotes) {
        
        require(validTeamName(_teamName), "invalid team name");
        
        uint _voteBackingInWei = msg.value;
        address _voter = msg.sender;
        
        teamBackingInWei[_teamName] += _voteBackingInWei;
        teamVotes[_teamName].push(Vote({
            voter: _voter,
            voteBackingInWei: _voteBackingInWei
        }));
        
        totalNumVotes += 1;
        totalVoteBacking += _voteBackingInWei;
        
    }
    
    function declareWinner(bytes32 winningTeam) public forRefereeOnly() {
        //update state 
        currentState = GameState.WinnerDeclared;
        
        //call doPayouts
    }
    
    // "private" means this function is only visible to this contract.
    // can only be called from within this contract
    function doPayouts() private inState(GameState.WinnerDeclared) {
        
    }
    
    /* FUNCTIONS (CALLS) 
     * 
     * These do not change the state of our system,
     * and return immediately.
     */

    function getTeamNames() public view returns (bytes32[]) {
        return teamNames;
    }

    function getTeamCount() public view returns (uint) {
        return teamNames.length;
    }
    
    function getTotalVoteCount() public view returns (uint) {
        return totalNumVotes;
    }
    
    function getTotalVoteBackingInWei() public view returns (uint) {
        return totalVoteBacking;
    }
    
    function getVoteCountForTeam(bytes32 _teamName) public view returns (uint) {
        require(validTeamName(_teamName), "invalid team name");
        
        return teamVotes[_teamName].length;
    } 
    
    function getVoteBackingInWeiForTeam(bytes32 _teamName) public view returns (uint) {
        require(validTeamName(_teamName), "invalid team name");
        
        return teamBackingInWei[_teamName];
    }
    
    function validTeamName(bytes32 _teamName) public view returns (bool) {
        for(uint i = 0; i < teamNames.length; i++) {
            if (teamNames[i] == _teamName) {
                return true;
            }
        }
        return false;
    }
}
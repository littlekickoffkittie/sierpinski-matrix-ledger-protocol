// networkGovernance.ts
// Implementation of network governance and voting protocols with real voting mechanisms

interface Proposal {
  id: string;
  description: string;
  votes: Map<string, number>;
  totalVotes: number;
  passed: boolean;
}

export class NetworkGovernance {
  private proposals: Map<string, Proposal>;
  private voters: Set<string>;

  constructor() {
    this.proposals = new Map();
    this.voters = new Set();
  }

  // Create a new proposal
  createProposal(id: string, description: string): void {
    if (this.proposals.has(id)) {
      throw new Error(`Proposal with id ${id} already exists`);
    }
    this.proposals.set(id, {
      id,
      description,
      votes: new Map(),
      totalVotes: 0,
      passed: false,
    });
  }

  // Cast a vote for a proposal by voter ID
  castVote(proposalId: string, voterId: string, weight: number): void {
    if (weight <= 0) {
      throw new Error("Vote weight must be positive");
    }
    const proposal = this.proposals.get(proposalId);
    if (!proposal) {
      throw new Error(`Proposal with id ${proposalId} not found`);
    }
    if (proposal.votes.has(voterId)) {
      throw new Error(`Voter ${voterId} has already voted on proposal ${proposalId}`);
    }
    proposal.votes.set(voterId, weight);
    proposal.totalVotes += weight;
    this.voters.add(voterId);
  }

  // Calculate the total votes cast for a proposal
  getTotalVotes(proposalId: string): number {
    const proposal = this.proposals.get(proposalId);
    if (!proposal) {
      throw new Error(`Proposal with id ${proposalId} not found`);
    }
    return proposal.totalVotes;
  }

  // Get the vote weight for a specific voter on a proposal
  getVoteWeight(proposalId: string, voterId: string): number {
    const proposal = this.proposals.get(proposalId);
    if (!proposal) {
      throw new Error(`Proposal with id ${proposalId} not found`);
    }
    return proposal.votes.get(voterId) || 0;
  }

  // Determine if a proposal passes based on a threshold
  proposalPassed(proposalId: string, threshold: number): boolean {
    if (threshold <= 0 || threshold > 1) {
      throw new Error("Threshold must be between 0 and 1");
    }
    const proposal = this.proposals.get(proposalId);
    if (!proposal) {
      throw new Error(`Proposal with id ${proposalId} not found`);
    }
    // Calculate total possible votes as sum of all votes cast by all voters across all proposals
    let totalPossibleVotes = 0;
    for (const p of this.proposals.values()) {
      totalPossibleVotes += p.totalVotes;
    }
    const voteRatio = proposal.totalVotes / totalPossibleVotes;
    proposal.passed = voteRatio >= threshold;
    return proposal.passed;
  }

  // List all proposals
  listProposals(): Proposal[] {
    return Array.from(this.proposals.values());
  }
}

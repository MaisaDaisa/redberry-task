import React, {
  useState,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
  Ref,
} from 'react'
import DropDownSelect from '@/components/DropDownSelect'
import { agentGetMany } from '@/api/apiTypes'
import { getAgents } from '@/api/getRequests'

export type AgentDropdownRef = {
  fetchAgents: () => void
  checkAgentValid: () => void
}

interface AgentDropdownProps {
  chosenAgentsRef: React.MutableRefObject<agentGetMany | null>
  addAgentsButton: JSX.Element
  selectedAgentProp: agentGetMany | null
}

const AgentDropdown = (
  { chosenAgentsRef, addAgentsButton, selectedAgentProp }: AgentDropdownProps,
  ref: Ref<AgentDropdownRef>
) => {
  // Agents State may change when the user adds a new agent
  const [agentInvalid, setAgentInvalid] = useState<boolean>(false)
  const [agents, setAgents] = useState<agentGetMany[] | null>(null)
  const [selectedAgent, setSelectedAgent] = useState<agentGetMany | null>(
    selectedAgentProp
  )

  const fetchAgents = useCallback(async () => {
    try {
      const agentsResponse = await getAgents()
      setAgents(agentsResponse)
    } catch (error) {
      console.error('Failed to fetch agents:', error)
    }
  }, [])

  const handleAgentChange = useCallback(
    (agent: agentGetMany) => {
      chosenAgentsRef.current = agent
      setSelectedAgent(agent)
    },
    [chosenAgentsRef]
  )

  const handleCheckAgentValid = () => {
    setAgentInvalid(true)
  }

  // Expose the fetchAgents function to the parent component
  // So when the user adds a new agent, the dropdown will be updated
  useImperativeHandle(ref, () => {
    return { fetchAgents: fetchAgents, checkAgentValid: handleCheckAgentValid }
  })

  useEffect(() => {
    fetchAgents()
  }, [])

  return (
    agents && (
      <DropDownSelect
        isRejected={agentInvalid}
        placeHolderText="აირჩიე აგენტი"
        selectedValue={selectedAgent}
        items={agents as agentGetMany[]}
        parentStateSetter={handleAgentChange}
        title="Select"
        required={true}
        isAgents={true}
        additionalComponent={addAgentsButton}
      />
    )
  )
}

export default forwardRef(AgentDropdown)

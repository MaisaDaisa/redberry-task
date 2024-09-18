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
}

interface AgentDropdownProps {
  chosenAgentsRef: React.MutableRefObject<agentGetMany | null>
  addAgentsButton: JSX.Element
}

const AgentDropdown = (
  { chosenAgentsRef, addAgentsButton }: AgentDropdownProps,
  ref: Ref<AgentDropdownRef>
) => {
  const [agents, setAgents] = useState<agentGetMany[] | null>(null)
  const [selectedAgent, setSelectedAgent] = useState<agentGetMany | null>(null)

  const fetchAgents = useCallback(async () => {
    try {
      const agentsResponse = await getAgents()
      setAgents(agentsResponse)
      chosenAgentsRef.current = agentsResponse[0]
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

  useImperativeHandle(ref, () => {
    return { fetchAgents: fetchAgents }
  })

  useEffect(() => {
    fetchAgents()
  }, [])

  return (
    agents && (
      <DropDownSelect
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

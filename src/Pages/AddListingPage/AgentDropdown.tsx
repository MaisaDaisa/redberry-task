import React, {
  useState,
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react'
import DropDownSelect from '@/components/DropDownSelect'
import { agentGetMany } from '@/api/apiTypes'
import { getAgents } from '@/api/getRequests'

interface AgentDropdownProps {
  reloadAgents: React.MutableRefObject<any>
  chosenAgentsRef: React.MutableRefObject<agentGetMany | null>
  addAgentsButton: JSX.Element
}
const AgentDropdown = forwardRef(
  ({ chosenAgentsRef, addAgentsButton, reloadAgents }: AgentDropdownProps) => {
    const [agents, setAgents] = useState<agentGetMany[] | null>(null)
    const [selectedAgent, setSelectedAgent] = useState<agentGetMany | null>(
      null
    )

    const fetchAgents = useCallback(async () => {
      try {
        const agentsResponse = await getAgents()
        setAgents(agentsResponse)
      } catch (error) {
        console.error('Failed to fetch agents:', error)
      }
    }, [])

    const handleAgentChange = useCallback((agent: agentGetMany) => {
      chosenAgentsRef.current = agent
      setSelectedAgent(agent)
    }, [])

    useImperativeHandle(reloadAgents, () => {
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
)

export default AgentDropdown

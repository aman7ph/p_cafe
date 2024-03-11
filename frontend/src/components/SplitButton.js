import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Dropdown from "react-bootstrap/Dropdown"

function SplitButton({ title, actions }) {
  return (
    <Dropdown as={ButtonGroup}>
      <Button variant="success">{title}</Button>

      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

      <Dropdown.Menu>
        {actions.map((action, index) => {
          return (
            <Dropdown.Item key={index} href={action.link}>
              {action.name}
            </Dropdown.Item>
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default SplitButton

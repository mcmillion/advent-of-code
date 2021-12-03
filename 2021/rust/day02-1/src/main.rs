fn main() {
    let inputs = util::load_inputs_as_string_array();
    let result = calculate_position_from_inputs(inputs);

    println!("Total: {}", result.horizontal * result.depth);
}

struct PositionResult {
    horizontal: u32,
    depth: u32,
}

fn calculate_position_from_inputs(inputs: Vec<String>) -> PositionResult {
    let mut result = PositionResult {
        horizontal: 0,
        depth: 0,
    };

    for input in inputs {
        // Match parsed actions and update counts
        let (action, count) = parse_action_and_count(&input);
        match action {
            "forward" => result.horizontal += count,
            "down" => result.depth += count,
            "up" => result.depth -= count,
            _ => panic!("Invalid action"),
        }
    }

    result
}

fn parse_action_and_count(input: &str) -> (&str, u32) {
    let split: Vec<&str> = input.split_whitespace().collect();
    match split[..] {
        [action, count] => (action, count.parse::<u32>().expect("Unable to parse u32")),
        _ => panic!("Invalid input"),
    }
}

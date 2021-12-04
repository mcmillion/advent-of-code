const MESSAGE_WIDTH: usize = 12;

fn main() {
    let inputs = include_str!("../input.txt").lines().collect::<Vec<_>>();

    let oxygen_idx = find_rating(&inputs, '1');
    let co2_idx = find_rating(&inputs, '0');

    println!("oxygen_idx: {}, co2_idx: {}", oxygen_idx, co2_idx);

    let oxygen = u32::from_str_radix(oxygen_idx, 2).unwrap();
    let co2 = u32::from_str_radix(co2_idx, 2).unwrap();

    println!("oxygen: {}, co2: {}, total: {}", oxygen, co2, oxygen * co2);
}

fn find_rating<'a>(inputs: &[&'a str], preference: char) -> &'a str {
    let mut current_inputs = inputs.to_owned();
    for position in 0..MESSAGE_WIDTH {
        println!("\nposition: {}, inputs: {}", position, current_inputs.len());

        let (high_values, low_values) = count_reading_values(&current_inputs, position);
        let significant_reading =
            calculate_significant_reading(high_values, low_values, preference);

        current_inputs =
            filter_inputs_by_significant_reading(&current_inputs, significant_reading, position);

        // If this is the last reading, return it, otherwise recurse on the next position
        if current_inputs.len() == 1 {
            return current_inputs[0];
        }
    }

    unreachable!();
}

fn count_reading_values(inputs: &[&str], position: usize) -> (u32, u32) {
    let mut high_values: u32 = 0;
    let mut low_values: u32 = 0;

    for input in inputs {
        match input.chars().nth(position).unwrap() {
            '1' => high_values += 1,
            '0' => low_values += 1,
            _ => unreachable!(),
        }
    }

    println!("high_values: {}, low_values: {}", high_values, low_values);

    (high_values, low_values)
}

fn calculate_significant_reading(high_values: u32, low_values: u32, preference: char) -> char {
    let significant_reading = match high_values {
        v if (preference == '1') && (v > low_values) => '1',
        v if (preference == '1') && (v == low_values) => preference,
        v if (preference == '1') && (v < low_values) => '0',
        v if (preference == '0') && (v > low_values) => '0',
        v if (preference == '0') && (v == low_values) => preference,
        v if (preference == '0') && (v < low_values) => '1',
        _ => unreachable!(),
    };

    println!("significant_reading: {}", significant_reading);

    significant_reading
}

fn filter_inputs_by_significant_reading<'a>(
    inputs: &[&'a str],
    significant_reading: char,
    position: usize,
) -> Vec<&'a str> {
    let filtered_inputs = inputs
        .iter()
        .filter(|i| i.chars().nth(position).unwrap() == significant_reading)
        .copied()
        .collect::<Vec<&str>>();

    let remaining_inputs_count = filtered_inputs.len();
    let removed_inputs_count = inputs.len() - remaining_inputs_count;

    println!(
        "removed {} inputs, left with {}",
        removed_inputs_count, remaining_inputs_count
    );

    filtered_inputs
}

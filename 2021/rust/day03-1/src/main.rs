const MESSAGE_WIDTH: usize = 12;
const INPUTS_LENGTH: usize = 1000;

fn main() {
    let inputs = include_str!("../input.txt").lines();

    // Count the number of high (1) readings in each column
    let mut high_readings: [u32; MESSAGE_WIDTH] = [0; MESSAGE_WIDTH];
    for input in inputs {
        for (i, reading) in input.chars().enumerate() {
            if reading == '1' {
                high_readings[i] += 1;
            }
        }
    }

    println!("high_readings: {:?}", high_readings);

    // Take the high readings and two strings represent binary based on
    // the significance of each position
    let mut gamma_idx: String = String::from("");
    let mut epsilon_idx: String = String::from("");
    let threshold: u32 = (INPUTS_LENGTH / 2).try_into().unwrap();
    for reading in high_readings {
        // If the reading is high, gamma gets a 1, epsilon gets a 0
        if reading >= threshold {
            gamma_idx.push('1');
            epsilon_idx.push('0');
        } else {
            gamma_idx.push('0');
            epsilon_idx.push('1');
        }
    }

    println!("gamma_idx: {}, epsilon_idx: {}", &gamma_idx, &epsilon_idx);

    let gamma = u32::from_str_radix(gamma_idx.as_str(), 2).unwrap();
    let epsilon = u32::from_str_radix(epsilon_idx.as_str(), 2).unwrap();

    println!("Total: {}", gamma * epsilon);
}

use std::fs;

fn main() {
    // Read the input file into memory
    let filename = "input.txt";
    let contents = fs::read_to_string(filename)
        .expect("Unabled to read input file");

    // Split inputs into vector
    let inputs = contents.lines();

    // Loop over inputs and count the number of size increases
    let mut increases = 0;
    let mut previous_input = 0;
    for input in inputs {
        let current_input = input.parse::<i32>()
            .expect("Unable to parse String to i32");

        if previous_input > 0 {
            // Increment if current input is larger than previous_input
            if current_input > previous_input {
                increases = increases + 1;
            }
        }

        previous_input = current_input;
    }

    println!("Total increases: {}", increases);
}

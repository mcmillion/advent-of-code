use std::fs;

/// Parses an input.txt as array of lines
pub fn load_inputs_as_string_array() -> Vec<String> {
    // Read the input file into memory
    let filename = "input.txt";
    let contents = fs::read_to_string(filename).expect("Unabled to read input file");

    // Split inputs into vector
    let inputs = contents
        .lines()
        .map(|x| x.to_string())
        .collect::<Vec<String>>();

    inputs
}

pub fn this_is_a_test() {
    println!("thing");
}

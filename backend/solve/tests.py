from django.test import SimpleTestCase
from backend.solve import (
    moves,
    validate,
    solve_cube,
    randomize,
    bottomCross,
    bottomCorners,
    secondLayer,
    topCross,
    topCrossOrientation,
    topCorners,
    topCornersOrientation,
)
import time



def execute_step(step_name, solve_function, validate_function, rubiks_cube, sequence):
    """
    Executes a solving step, validates the result, and appends the sequence of moves.
    """
    try:
        print(step_name)
        step_sequence, rubiks_cube = solve_function(rubiks_cube)
        sequence.extend(step_sequence)
        print(step_sequence)
        if not validate_function(rubiks_cube):
            raise ValueError(f"{step_name} validation failed.")
    except Exception as e:
        raise ValueError(f"{step_name} failed: {e}")
    return rubiks_cube


# Assuming the necessary functions (randomize, validate, etc.) are imported
# from their respective modules

def solve_cube_test(rubiks_cube):
    sequence = []

    solvable, error = validate.checkCube(rubiks_cube)
    if not solvable:
        return [], False, error

    sequenceCube = rubiks_cube.copy()

    try:
        print("bottomcross")
        crossSequence, rubiks_cube = bottomCross.bottomCross(rubiks_cube)
        sequence.extend(crossSequence)
        print(crossSequence)
        solvable = validate.checkBottomCross(rubiks_cube)
    except Exception as e:
        solvable = False

    if not solvable:
        return [], False, f'Step 1 failed, there is a problem with side of {rubiks_cube["D5"]} color.'

    try:
        print("bottomcorners")
        cornersSequence, rubiks_cube = bottomCorners.bottomCorners(rubiks_cube)
        sequence.extend(cornersSequence)
        print(cornersSequence)
        solvable = validate.checkBottomCorners(rubiks_cube)
    except Exception as e:
        solvable = False

    if not solvable:
        return [], False, f'Step 2 failed, there is a problem with corner of {rubiks_cube["D5"]} color.'

    try:
        print("2nd layer")
        secondLayerSequence, rubiks_cube = secondLayer.secondLayer(rubiks_cube)
        sequence.extend(secondLayerSequence)
        print(secondLayerSequence)
        solvable = validate.checkSecondLayer(rubiks_cube)
    except Exception as e:
        solvable = False

    if not solvable:
        return [], False, 'Step 3 failed, there is a problem with second layer.'

    try:
        print("topCross")
        topCrossSequence, rubiks_cube = topCross.top_cross(rubiks_cube)
        sequence.extend(topCrossSequence)
        print(topCrossSequence)
        solvable = validate.checkTopCross(rubiks_cube)
    except Exception as e:
        solvable = False

    if not solvable:
        return [], False, f'Step 4 failed, there is a problem with side of {rubiks_cube["U5"]} color.'

    try:
        print("topcrossOrientation")
        topCrossOrientationSequence, rubiks_cube = topCrossOrientation.topCrossOrientation(rubiks_cube)
        sequence.extend(topCrossOrientationSequence)
        print(topCrossOrientationSequence)
        solvable = validate.checkTopCrossOrientation(rubiks_cube)
    except Exception as e:
        solvable = False

    if not solvable:
        return [], False, f'Step 5 failed, there is a problem with side of {rubiks_cube["D5"]} color.'

    try:
        print("topCorners")
        topCornersSequence, rubiks_cube = topCorners.topCorners(rubiks_cube)
        sequence.extend(topCornersSequence)
        print(topCornersSequence)
        solvable = validate.checkTopCorners(rubiks_cube)
    except Exception as e:
        solvable = False

    if not solvable:
        return [], False, f'Step 6 failed, there is a problem with corner of {rubiks_cube["U5"]} color.'

    try:
        print("topCornersOrientation")
        topCornersOrientationSequence, rubiks_cube = topCornersOrientation.topCornersOrienation(rubiks_cube)
        sequence.extend(topCornersOrientationSequence)
        print(topCornersOrientationSequence)
        solvable = validate.checkTopCornersOrietation(rubiks_cube)
    except Exception as e:
        solvable = False

    if not solvable:
        return [], False, f'Step 7 failed, there is a problem with corner of {rubiks_cube["U5"]} color.'

    moves.print_2d_cube(rubiks_cube)
    return sequence, True, ""


def test_validation(cube, num_tests=5):
    cubes = []
    total = 0
    errors = []

    for _ in range(num_tests):
        try:
            rubiks_cube = randomize.randomize(cube)
            sequence, rubiks_cube = bottomCross.bottomCross(rubiks_cube)
            sequence, rubiks_cube = bottomCorners.bottomCorners(rubiks_cube)
            sequence, rubiks_cube = secondLayer.secondLayer(rubiks_cube)
            sequence, rubiks_cube = topCross.top_cross(rubiks_cube)
            sequence, rubiks_cube = topCrossOrientation.topCrossOrientation(rubiks_cube)
            sequence, rubiks_cube = topCorners.topCorners(rubiks_cube)
            sequence, rubiks_cube = topCornersOrientation.topCornersOrienation(rubiks_cube)
            solved = validate.checkTopCornersOrietation(rubiks_cube)
            if not solved:
                cubes.append(rubiks_cube)
                errors.append('Validation failed after applying all steps.')
            total += len(sequence)
        except Exception as e:
            cubes.append(rubiks_cube)
            errors.append(f'Exception during test: {str(e)}')

    if not cubes:
        print(f"All {num_tests} test cases passed")
        return total / num_tests
    else:
        print(f"Failed test cases: {len(cubes)}")
        for rubik in cubes:
            moves.print_2d_cube(rubik)
        return cubes, errors


if __name__ == "__main__":
    from time import time
    elapsed_time=0;
    rubiks_cube =  {
    'F1': 'G', 'F2': 'G', 'F3': 'G', 'F4': 'G', 'F5': 'G', 'F6': 'G',
    'F7': 'G', 'F8': 'G', 'F9': 'G',  # Front face: Green

    'R1': 'R', 'R2': 'R', 'R3': 'R', 'R4': 'R', 'R5': 'R', 'R6': 'R',
    'R7': 'R', 'R8': 'R', 'R9': 'R',  # Right face: Red

    'B1': 'B', 'B2': 'B', 'B3': 'B', 'B4': 'B', 'B5': 'B', 'B6': 'B',
    'B7': 'B', 'B8': 'B', 'B9': 'B',  # Back face: Blue

    'L1': 'O', 'L2': 'O', 'L3': 'O', 'L4': 'O', 'L5': 'O', 'L6': 'O',
    'L7': 'O', 'L8': 'O', 'L9': 'O',  # Left face: Orange

    'U1': 'W', 'U2': 'W', 'U3': 'W', 'U4': 'W', 'U5': 'W', 'U6': 'W',
    'U7': 'W', 'U8': 'W', 'U9': 'W',  # Upper face: White

    'D1': 'Y', 'D2': 'Y', 'D3': 'Y', 'D4': 'Y', 'D5': 'Y', 'D6': 'Y',
    'D7': 'Y', 'D8': 'Y', 'D9': 'Y',  # Down face: Yellow
}
    # {
    #     'F1': 'O', 'F2': 'R', 'F3': 'O', 'F4': 'Y', 'F5': 'R', 'F6': 'O',
    #     'F7': 'B', 'F8': 'Y', 'F9': 'Y', 'R1': 'G', 'R2': 'O', 'R3': 'B',
    #     'R4': 'B', 'R5': 'G', 'R6': 'B', 'R7': 'G', 'R8': 'G', 'R9': 'W',
    #     'B1': 'O', 'B2': 'Y', 'B3': 'W', 'B4': 'W', 'B5': 'O', 'B6': 'O',
    #     'B7': 'R', 'B8': 'O', 'B9': 'O', 'L1': 'R', 'L2': 'R', 'L3': 'G',
    #     'L4': 'W', 'L5': 'B', 'L6': 'G', 'L7': 'Y', 'L8': 'R', 'L9': 'R',
    #     'U1': 'B', 'U2': 'B', 'U3': 'W', 'U4': 'W', 'U5': 'Y', 'U6': 'G',
    #     'U7': 'Y', 'U8': 'B', 'U9': 'W', 'D1': 'Y', 'D2': 'R', 'D3': 'R',
    #     'D4': 'G', 'D5': 'W', 'D6': 'W', 'D7': 'B', 'D8': 'Y', 'D9': 'G',
    # }
    

    num_tests = 1
    start_time = time()
    result = test_validation(rubiks_cube, num_tests)
    end_time = time()
    elapsed_time = end_time - start_time

    if isinstance(result, list):
        print(f"Number of tests run: {num_tests}.")
        print(f"Failed test cases: {len(result)}")
        print(f"Time taken: {elapsed_time:.2f} seconds.")
    else:
        print(f"Number of tests run: {num_tests}. Average moves: {result:.2f}.")
        print(f"Time taken: {elapsed_time:.2f} seconds.")
